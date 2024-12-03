export default function randomiseAndShortenList(list, maxItems) {
    return list.sort(() => 0.5 - Math.random()).slice(0, maxItems);
}
