export const formatDate = (lastChange: string) => {
    const date: Date = new Date(lastChange);
    return date.toLocaleString();
}