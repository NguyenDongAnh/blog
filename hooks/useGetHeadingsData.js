import React, { useEffect, useState } from "react";
import slugify from "slugify";
const useGetHeadingsData = () => {
    const [headingsData, setHeadingsData] = useState([]);

    const getNestedHeadings = (headingElements) => {
        const nestedHeadings = [];

        headingElements.forEach((heading, index) => {
            const { innerText: title } = heading;

            if (heading.nodeName === "H1") {
                nestedHeadings.push({
                    slug: slugify(title) + `-${index}`,
                    title: title,
                    children: []
                });
            } else if (heading.nodeName === "H2" && nestedHeadings.length === 0) {
                nestedHeadings.push({
                    slug: slugify(title) + `-${index}`,
                    title: title,
                    children: []
                });
            } else if (heading.nodeName === "H2" && nestedHeadings.length > 0) {
                nestedHeadings[nestedHeadings.length - 1].children.push({
                    slug: slugify(title) + `-${index}`,
                    title: title,
                    children: []
                });
            } else if (heading.nodeName === "H3" && nestedHeadings[nestedHeadings.length - 1].children.length === 0) {
                nestedHeadings[nestedHeadings.length - 1].children.push({
                    slug: slugify(title) + `-${index}`,
                    title: title,
                    children: []
                });
            } else if (heading.nodeName === "H3" && nestedHeadings[nestedHeadings.length - 1].children.length > 0) {
                nestedHeadings[nestedHeadings.length - 1].children[nestedHeadings[nestedHeadings.length - 1].children.length - 1].children.push({
                    slug: slugify(title) + `-${index}`,
                    title: title,
                    children: []
                });
            }
        });

        return nestedHeadings;
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Client-side-only code
            const hTags = Array.from(document.querySelectorAll("h1, h2, h3"));
            nestedHeadings = getNestedHeadings(hTags)
            setHeadingsData(() => nestedHeadings)
            return () => {
            }
        }
    }, []);

    return headingsData;
}

export default useGetHeadingsData