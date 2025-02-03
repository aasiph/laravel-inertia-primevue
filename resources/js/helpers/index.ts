export * from "./screen";


export function getInitials(fullName: string) {
    // let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
    //
    // let initialsarr = [...fullName.matchAll(rgx)] || [];
    // return ((initialsarr.shift()?.[1] || '') + (initialsarr.pop()?.[1] || '')).toUpperCase();

    const [firstName, ...restNames] = fullName.toUpperCase().trim().split(" ");

    if (!restNames.length) {
        return firstName.substring(0, 2);
    }

    const firstNameInitial = firstName[0];
    const lastNameInitial = restNames.pop()![0];

    return `${firstNameInitial}${lastNameInitial}`;
}
