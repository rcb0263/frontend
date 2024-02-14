import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { Handlers } from "$fresh/server.ts";

type spaceship = {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    page: string;
};

type PagePropsWithPage = PageProps<spaceship> & { page: number };

export const handler: Handlers = {
    async GET(_req: Request, ctx: FreshContext<unknown, spaceship>) {
         let url = new URL(_req.url) || undefined;
         let page= "2";
         if(url !== undefined){
            let page = url.searchParams.get("page") || undefined;
            if (page === undefined) {
                page = "1";
            }
         }
        const starships = await Axios.get<spaceship>(
            `https://swapi.dev/api/starships/${page}/`,
        );
        return ctx.render({
            page: page,
            name: starships.data.name,
            model: starships.data.model,
            manufacturer: starships.data.manufacturer,
            cost_in_credits: starships.data.cost_in_credits,
        });
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
                <div>
                <a href={`/starships?page=${page-1}`}>Anterior</a></div>
                <form method="get" action="/starships">
                    <input type="text" name="page"/>
                        <button>Buscar</button>
                </form>
                <div>
                <a href={`/starships?page=${page+1}`}>Siguiente</a></div>
            </div>
        );
    } catch (e) {
        return <div>Ha habido un error</div>;
    }
}