export default function randomiseAndShortenList(
    list: string[],
    maxItems: integer
) {
    return list.sort(() => 0.5 - Math.random()).slice(0, maxItems);
}
