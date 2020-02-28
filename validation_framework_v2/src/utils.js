


export default function formatAuthors(authors) {
    if (authors) {
        return authors.map(author => (author.given_name + " " + author.family_name)).join(", ");
    } else {
        return "";
    }
}