export type Page = {
    match: string;
    default: string;
    alias: string;
    menu: boolean;
    navbar: boolean;
    icon: string;
    auth: boolean;
    component: () => void;
    props: { title: string; keywords: string; description: string };
};

export type Session = {
    userid: string,
    username: string,
    access: string,
    refresh: string
}