import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { Handlers } from "$fresh/server.ts";

type starship = {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    page: string;
};

type Error1 = {
    detail: string
}

type PagePropsWithPage = PageProps<starship> & { page: number };

export const handler: Handlers = {
    async GET(_req: Request, ctx: FreshContext<unknown, starship>) {
        try {
            const url = new URL(_req.url);
            console.log(url);
            let page = url.searchParams.get("page") || undefined;
            if (page === undefined) {
                page = "3";
            }
            console.log(url);
            console.log(page);
            
            const starships = await Axios.get<starship>(`https://swapi.dev/api/starships/${page}/`);
    
            return ctx.render({
                page: page,
                name: starships.data.name,
                model: starships.data.model,
                manufacturer: starships.data.manufacturer,
                cost_in_credits: starships.data.cost_in_credits,
            });
        } catch (error) {
            const url = new URL(_req.url);
            console.log(url);
            let page = url.searchParams.get("page");
            if (page === null) {
                page = "3";
            } 
            return ctx.render({
                page: page,
                name: "error",
                model: "valor no valido",
                manufacturer: "cambia de pagina",
                cost_in_credits: "o introduce un valor valido",
            });
        }

    },
};
export default function Page(props: PagePropsWithPage) {
    try {
        const starship = props.data;
        let page = parseInt(props.data.page);
        return (
            <div>
                <div>
                    <h1>{starship.name}</h1>
                    <p>name: {starship.name}</p>
                    <p>model: {starship.model}</p>
                    <p>manufacturer: {starship.manufacturer}</p>
                    <p>cost in credits: {starship.cost_in_credits}</p>
                </div>
                <div><a href={`/starships?page=${page-1}`}>Anterior</a></div>
                <form method="get" action="/starships">
                    <input type="text" name="page" />
                    <button type="submit">Enviar</button>
                </form>
                <div><a href={`/starships?page=${page+1}`}>Siguiente</a></div>
            </div>
        );
    } catch (e) {
        return <div>Ha habido un error</div>;
    }
}