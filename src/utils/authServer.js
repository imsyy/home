/**
 * authServer
 * Made by NanoRocky
 * 这个模块除了腾讯地图的签名认证外，其余函数并不对其他人有任何鸟用（大概叭）
 * 涉及到接口加密的东西怎么能不整点代码混淆，对叭对叭~（x）
 * 该说不说写点答辩还挺有意思嘟（bushi）
 */


import { md5 as d } from "js-md5";

let x = null, y = null;
const f = () => Math.floor(Date.now() / 1000);
const o = (v) => v.toString(16);

async function gst() {
    if (!x) {
        try {
            const { timestamp: t } = await (await fetch("https://nanorocky.top/time/")).json();
            x = t;
            y = f();
        } catch (error) {
            x = y = f();
        };
    };
    return x + (f() - y);
};

export async function gwp(u, s, b) {
    // 备注：POST 方法需要传入 body ！
    const { origin: ul, pathname: p } = new URL(u);
    return `${ul}${p}?sig=${d(`${p}?${Object.keys(b).sort().map(key => `${key}=${JSON.stringify(b[key])}`).join("&")}${s}`).toLowerCase()}`;
};


export async function gwg(u, s) {
    const { origin: ul, pathname: p } = new URL(u), q = new URLSearchParams(new URL(u).search);
    q.set("sig", d(`${p}?${[...q.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => `${key}=${value}`).join("&")}${s}`).toLowerCase());
    return `${ul}${p}?${q.toString()}`;
};

export async function gasA(p, s) {
    const t = await gst(), r = Math.random().toString(36).substring(2, 12);
    return [t, r, "0", d(`${p}-${t}-${r}-0-${s}`)].join("-");
};

export async function gasB(u, s) {
    const { origin: ul, pathname: p } = new URL(u);
    const t = new Date((await gst()) * 1000 + 8 * 3600 * 1000).toISOString().replace(/[-T:]|(\..*)/g, "").substring(0, 12);
    return `${ul}/${t}/${d(`${s}${t}/${p}`)}/${p}`;
};

export async function gasC(u, s) {
    const { origin: ul, pathname: p } = new URL(u);
    const t = o((await gst()));
    return `${ul}/${d(`${s}/${p}${t}`)}/${t}/${p}`;
};

export async function gasDH(u, s) {
    const ul = new URL(u), p = ul.pathname, t = await gst();
    ul.searchParams.set("sign", d(`${s}/${p}${t}`));
    ul.searchParams.set("t", t);
    return ul.toString();
};

export async function gasDI(u, s) {
    const ul = new URL(u), p = ul.pathname, t = o(await gst());
    ul.searchParams.set("sign", d(`${s}/${p}${t}`));
    ul.searchParams.set("t", t);
    return ul.toString();
};
