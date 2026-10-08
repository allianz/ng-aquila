import { inject, Injectable } from '@angular/core';
import Fuse from 'fuse.js';

import { fuseOptions } from '../../../../ngx-docs-cli/src/shared/search.constants';
import { NxvVersionHashService } from '../core/version-hash';

/**
 * Matches a query that looks for inputs by a value they accept: `size:small` searches the `size`
 * input only, `:small` every input, and `size:` lists every value of the `size` input. The input
 * may be written in brackets (`[size]:small`), the way it is bound in a template.
 */
const INPUT_VALUE_QUERY = /^\[?([\w-]*)\]?:(.*)$/;

/** A query for inputs by a value they accept. */
export interface InputValueQuery {
  /** Name of the input to search, or null to search every input. */
  input: string | null;
  /** The value to look for, or an empty string to list every value of the input. */
  value: string;
}

/** An input of a search result that accepts the value that was searched for. */
export interface InputValueMatch {
  name: string;
  values: { value: string; matched: boolean }[];
}

@Injectable({
  providedIn: 'root',
})
export class FuseSearchService {
  private readonly _hashService = inject(NxvVersionHashService);
  private fuse: any;
  private entries: any[] = [];
  /** Lower case names of all documented inputs, to tell `size:small` apart from `nx-icon:hover`. */
  private inputNames = new Set<string>();

  init(): Promise<boolean> {
    return new Promise((resolve) => {
      Promise.all([
        fetch(this._hashService.appendVersion('lib-viewer/fuse-search-index.json')),
        fetch(this._hashService.appendVersion('lib-viewer/fuse-search-entries.json')),
      ])
        .then(async (res) => Promise.all(res.map((r) => r.json())))
        .then((results) => {
          const searchData = {
            index: results[0],
            entries: results[1],
          };
          const myIndex = Fuse.parseIndex(searchData.index);
          // initialize Fuse with the index
          this.fuse = new Fuse(searchData.entries, fuseOptions, myIndex);
          this.entries = searchData.entries;
          this.inputNames = new Set(
            this.entries.flatMap((entry) => entry.inputs ?? []).map((name) => name.toLowerCase()),
          );
          resolve(true);
        });
    });
  }

  /**
   * Reads an input value query from a search term, or returns null if it is a normal search. Text in
   * front of the colon that is no input name, as in `nx-icon:hover`, keeps the term a normal search.
   */
  parseInputValueQuery(term: string): InputValueQuery | null {
    const match = term.trim().match(INPUT_VALUE_QUERY);
    const value = match?.[2].trim() ?? '';

    const input = match?.[1] || null;

    // A bare colon names neither an input nor a value.
    if (!match || (!input && !value) || (input && !this.inputNames.has(input.toLowerCase()))) {
      return null;
    }

    return { input, value };
  }

  search(term: string) {
    const inputValueQuery = this.parseInputValueQuery(term);

    if (inputValueQuery) {
      return this.searchInputValue(inputValueQuery);
    }

    const results = this.fuse.search(`'${term}`);
    return results;
  }

  /**
   * Finds the directives and components with an input that accepts the given value, optionally only
   * the input of the given name. A value matches when it contains the term, so an empty term matches
   * every value. The input name has to match in full, and results with an exact value match come
   * first. Fuse is not involved: the value lists are small and a fuzzy match would only blur which
   * input takes what.
   */
  private searchInputValue(query: InputValueQuery) {
    const needle = query.value.toLowerCase();
    const inputName = query.input?.toLowerCase() ?? null;

    return this.entries
      .filter((item) => item.inputValues?.length)
      .map((item) => {
        const valueMatches: InputValueMatch[] = item.inputValues
          .map((input: { name: string; values: string[] }) => ({
            name: input.name,
            values: input.values.map((value) => ({
              value,
              matched: value.toLowerCase().includes(needle),
            })),
          }))
          .filter(
            (input: InputValueMatch) =>
              (inputName === null || input.name.toLowerCase() === inputName) &&
              input.values.some((value) => value.matched),
          );
        const isExact = valueMatches.some((input) =>
          input.values.some((value) => value.value.toLowerCase() === needle),
        );

        return { item, matches: [], valueMatches, isExact };
      })
      .filter((result) => result.valueMatches.length > 0)
      .sort(
        (a, b) => Number(b.isExact) - Number(a.isExact) || a.item.name.localeCompare(b.item.name),
      );
  }
}
