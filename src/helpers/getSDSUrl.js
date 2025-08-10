export const getSDSUrl = (page) => {
    const url = page.properties["Safety Data Sheet"].files[0].file.url
    if (url) {
        console.log(url)
        return url
    }
}