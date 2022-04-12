import React, { useState, useEffect, useContext } from 'react'
import dynamic from 'next/dynamic';
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGFM from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from 'rehype-highlight'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Icon } from '@iconify/react';
import styles from './Preview.module.css'
import slugify from 'slugify';

const Preview = (props) => {
    const { content, device, setTableOfContents, startTransition } = props;

    const getSlug = (hTag) => {
        return slugify(hTag.innerText, {
            lower: true,      // convert to lower case, defaults to `false`
            strict: true     // strip special characters except replacement, defaults to `false`
        })
    }

    useEffect(() => {
        if (device) {
            console.log(device)
            startTransition(() => {
                const hTags = document.querySelectorAll("h1, h2, h3");
                let headings = []
                hTags.forEach((hTag, index) => {
                    const tag = hTag.tagName
                    const title = hTag.innerText
                    const slug = getSlug(hTag) + `-${index}`
                    hTag.setAttribute("id", slug)
                    headings.push({
                        tag: tag,
                        title: title,
                        slug: slug,
                        top: hTag.offsetTop
                    })
                })
                console.log(headings)
                setTableOfContents(() => headings)
            })
        }

        return () => {

        }
    }, [device])

    return (
        <div className={styles.preview}>
            <div className="markdown-body">
                <ReactMarkdown
                    {...props}
                    children={content}
                    remarkPlugins={[remarkGFM, remarkMath]}
                    rehypePlugins={[rehypeRaw, rehypeKatex, [rehypeHighlight, { ignoreMissing: true, subset: true }]]}
                    // rehypePlugins={[rehypeHighlight, rehypeKatex, rehypeRaw]}
                    components={{
                        code({ node, children, inline, className, ...props }) {
                            if (!inline) {
                                return (
                                    <>
                                        {children ? (
                                            <CopyToClipboard text={String(children).replace(/\n$/, '')}>
                                                <div className={styles.clipboard} onClick={
                                                    (e) => {
                                                        e.target.classList.add(styles.tooltipped);
                                                        setTimeout(() => {
                                                            e.target.classList.remove(styles.tooltipped);
                                                        }, 2000)
                                                    }
                                                }>
                                                    <Icon icon="bx:bxs-copy" />
                                                </div>
                                            </CopyToClipboard>) : ""}
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    </>
                                )
                            }
                            return (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default Preview
