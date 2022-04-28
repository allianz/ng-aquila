export interface FontIcon {
    alias: string;
    font: string;
}

export const ICON_MAPPINGS: { [key: string]: FontIcon } = {
    bars: { alias: 'bars', font: 'far' },
    'bell-o': { alias: 'bell', font: 'far' },
    'bookmark-o': { alias: 'bookmark', font: 'far' },
    download: { alias: 'download', font: 'fas' },
    duplicate: { alias: 'copy', font: 'far' },
    facebook: { alias: 'facebook-square', font: 'fab' },
    file: { alias: 'file', font: 'far' },
    'file-text': { alias: 'file-alt', font: 'far' },
    'info-circle-o': { alias: 'info-circle', font: 'fas' },
    launch: { alias: 'external-link-alt', font: 'fas' },
    'lock-o': { alias: 'lock', font: 'fas' },
    mail: { alias: 'envelope', font: 'far' },
    'mail-o': { alias: 'envelope', font: 'fas' },
    pdf: { alias: 'file-pdf', font: 'far' },
    pen: { alias: 'pen', font: 'fas' },
    popout: { alias: 'expand-alt', font: 'fas' },
    refresh: { alias: 'redo', font: 'fas' },
    'phone-o': { alias: 'phone-alt', font: 'fas' },
    'product-car': { alias: 'car', font: 'fas' },
    'product-care-insurance': { alias: 'hand-holding-heart', font: 'fas' },
    'product-heart': { alias: 'heart', font: 'far' },
    'product-plane': { alias: 'plane', font: 'fas' },
    'product-search': { alias: 'search', font: 'fas' },
    'save-o': { alias: 'save', font: 'far' },
    search: { alias: 'search', font: 'fas' },
    setting: { alias: 'cog', font: 'fas' },
    'speech-bubble-o': { alias: 'comment', font: 'far' },
    twitter: { alias: 'twitter', font: 'fab' },
    'user-o': { alias: 'user', font: 'far' },
    // the users icon in font awesome is not quadratic as a workaround
    // we just reuse the single user here
    users: { alias: 'user', font: 'fas' },
    globe: { alias: 'globe', font: 'fas' },
    'grip-vertical': { alias: 'grip-vertical', font: 'fas' },
};
