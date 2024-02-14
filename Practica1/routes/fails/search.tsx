import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";

type Spaceship = {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
  };

type TPage = {
    info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
    };
    results: Spaceship[];
  };
  
  export const handler: Handlers = {
    async GET(_req: Request, ctx: FreshContext<unknown, Spaceship>) {
      try {
          const url = new URL(_req.url);
          const name = url.searchParams.get("name") || undefined;
          
        const character = await Axios.get<Spaceship>(
          `https://swapi.dev/api/starships/${name}/`,

        );
        console.log(character)
        return ctx.render({
          name: "",
          model: "",
          manufacturer: "",
          cost_in_credits: "",
        });
      } catch (e) {
        console.error(e);
        throw new Error("Ha habido un error");
      }
    },
  };
  
  export default function Page(props: PageProps<Spaceship>) {
    try {
      const character = props.data; //LDSJCN
      return (
        
        <div>
          <form method="get" action="/starships">
            <input type="text" name="name"/>
            <button>Buscar</button>
          </form>
          <h1>{character.name}</h1>
          <p>Name: {character.name}</p>
          <p>Height: {character.model}</p>
          <p>Mass: {character.manufacturer}</p>
          <p>gender: {character.cost_in_credits}</p>
        </div>
      );
    } catch (e) {
      return <div>Ha habido un error</div>;
    }
  }