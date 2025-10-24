---
title: Patterns
category: general
b2c: true
expert: true
stable: done
alias: patterns
a1: true
private: true
noApi: true
---

Welcome to our dedicated space for showcasing the implementation of Allianz Design System Patterns, sharing insightful How-Tos, and exploring intriguing topics that aren't linked to specific components. Here, we aim to provide exemplary code, patterns, and ideas. 

<strong>While we strive for perfection in our examples, please note that this area is primarily a platform for sharing and will be updated sporadically to manage maintenance efforts effectively.</strong>


## Soft Character Limit  
<div class="tag-list"> <div class="tag approved-tag">NDBX Approved</div> <div class="tag active-tag">a11y checked</div></div>


Sometimes it might be required to allow users to input or paste more text then a the input or text area allows before they submut a form. [The standard `maxlength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/maxlength) will cut of any text that extends the permitted length. 
A soft character limit enables a user to paste any text and cleanup the text before submitting. In this example the Text Area takes care of 
- showing remaining / exceeded characters
- announcing number of remaining / exceeded by screen reader
- validading input length 
- showing an error message if expected format is not met after edit

<!-- example(text-area-character-limit, { "privateExample": true, "hideStackblitzButton": true }) -->

## AI suggestions for Input fields 
<div class="tag-list">  <div class="tag approved-tag">NDBX Approved</div> </div>



<!-- example(ai-autofill, { "privateExample": true, "hideStackblitzButton": true }) -->


## Bypass Blocks 
<div class="tag-list"> <div class="tag active-tag">a11y example</div> </div>

🧪 To test this example properly,  <nx-link><a href="examples/a11y-skip-to-data-description">please test in full screen</a></nx-link> and then TAB from the start of the page 🧪

[Bypass Blocks](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks) can help keyboard users and users of assistive tools to navigate to relevant content quickly and skip repetitive elements like headers, navigation etc.

There are different ways to achieve that like anchor links (e.g. `<a href="#id-of-html-element">`). This example uses Angulars fragmented routing. 

<!-- example(a11y-skip-to-data-description, { "privateExample": true, "hideStackblitzButton": true }) -->

## Fetch Items on filter input  
<div class="tag-list"> <div class="tag active-tag">technical example ⚙️</div> </div>

<!-- example(dropdown-fetch-on-filter, { "privateExample": true, "hideStackblitzButton": true }) -->

## Contained List
<div class="tag-list"> <div class="tag approved-tag">NDBX approved</div> </div>

Styling option for list like presentations.

__Important:__ Do __not__ nest interactive elements like buttons into clickable List Items. That will result in unexpected UX for Users and [accessibility violations](https://www.accessibilitychecker.org/wcag-guides/ensure-interactive-controls-are-not-nested-as-they-are-not-always-announced-by-screen-readers-or-can-cause-focus-problems-for-assistive-technologies/). 

__Hint:__ There are many use cases for Contained Lists with clickable List Items. Make sure to use the right pattern for your use case like using anchors and encapsulating it into a `<nav>` container if you're using it for navigation. 



<!-- example(contained-list, { "privateExample": true, "hideStackblitzButton": true }) -->


<style>
    body{
        --grid-max-width: 1337px;
    }
    .component-overview__header {
        font-size: 3rem;
        font-weight: 600;
        background: linear-gradient(45deg, #00807D, #003781);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text; /* For Firefox */
        color: transparent;
        margin-bottom: 42px;
    }

    .component-overview__navigation {
        display: none;
    }

    .docs-markdown--h2{
        background: linear-gradient(45deg, #00807D, #003781);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text; /* For Firefox */
        color: transparent;
        display: inline-block;
    }

    .emphasis-text {
        font-weight: 600;
        color: #122b54;
    }

    .tag {
        font-size: var(--badge-font-size);
        line-height: var(--badge-line-height);
        font-weight: var(--badge-font-weight);
        letter-spacing: var(--badge-letter-spacing);
        display: inline-block;
        padding: 0 8px;
        white-space: nowrap;
        border-radius: 12px;
        min-width: 24px;
        -webkit-text-fill-color: var(--text-01);
        color: var(--text-01);
        position: relative;
        bottom: 7px;
        margin-left: 8px;
    }

    .tag-list {
        display: inline-block;
        margin-left: 8px;
    }

    .approved-tag {
        background-color: var(--badge-positive-background-color);   
    }

    .active-tag {
        background-color: var(--badge-active-background-color);
    }

    ..nxv-example-viewer__header {
        background-color: 
    }

</style>