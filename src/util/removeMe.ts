import me from "@/data/me";

export default function removeMe(list: string[]): string[] {
    return list.filter((item) => item !== me.name);
}
