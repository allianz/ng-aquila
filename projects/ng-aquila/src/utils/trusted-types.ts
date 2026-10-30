// TypeScript's DOM lib does not ship Trusted Types typings yet.
interface TrustedHTML {
  readonly __brand__: 'TrustedHTML';
}

interface TrustedTypePolicy {
  createHTML(input: string): TrustedHTML;
}

interface TrustedTypePolicyFactory {
  createPolicy(name: string, rules: { createHTML(input: string): string }): TrustedTypePolicy;
}

let policy: TrustedTypePolicy | undefined;
let policyRequested = false;

function getPolicy(): TrustedTypePolicy | undefined {
  if (policyRequested) {
    return policy;
  }
  policyRequested = true;

  const trustedTypes = (globalThis as { trustedTypes?: TrustedTypePolicyFactory }).trustedTypes;
  try {
    policy = trustedTypes?.createPolicy('ng-aquila', { createHTML: (s) => s });
  } catch (error) {
    console.error(error);
  }
  return policy;
}

/**
 * @docs-private
 * Only pass HTML that is already sanitized or comes from a trusted source.
 */
export function _trustedHTML(html: string): TrustedHTML {
  return getPolicy()?.createHTML(html) ?? (html as unknown as TrustedHTML);
}
