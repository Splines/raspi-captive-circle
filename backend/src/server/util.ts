export type Nullable<T> = T | null;

export function removeFromList(element: any, list: any[]) {
    list.forEach((el, index) => {
        if (element === el) list.splice(index, 1);
    });
}
