import { ApiDoc, ClassLikeExportDoc, MemberDoc } from '../common/api-doc-definitions';

/**
 * Processor that merges inherited properties of a class with the class doc. This is necessary
 * to properly show public properties from TypeScript mixin interfaces in the API.
 */
export class MergeInheritedProperties {
  process(docs: ApiDoc[]) {
    docs
      .filter((doc) => doc.docType === 'class')
      .forEach((doc) => this.addInheritedProperties(doc as ClassLikeExportDoc));
  }

  private addInheritedProperties(doc: ClassLikeExportDoc) {
    doc.implementsClauses
      .filter((clause) => clause.doc)
      .forEach((clause) => {
        clause.doc!.members.forEach((member) => this.addMemberDocIfNotPresent(doc, member));
      });

    doc.extendsClauses
      .filter((clause) => clause.doc)
      .forEach((clause) => {
        clause.doc!.members.forEach((member) => this.addMemberDocIfNotPresent(doc, member));
      });
  }

  private addMemberDocIfNotPresent(destination: ClassLikeExportDoc, memberDoc: MemberDoc) {
    if (!destination.members.find((member) => member.name === memberDoc.name)) {
      // A copy, because the categorizer decorates each member for the class it is listed in.
      destination.members.push({ ...memberDoc, containerDoc: destination });
    }
  }
}
