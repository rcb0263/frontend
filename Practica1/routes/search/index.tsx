import { PageProps } from "$fresh/server.ts";

type Data = {
  name?: string;
};

const Page = () => {
  return (
    <div>
      <form method="get" action="/people">
        <input type="text" name="name"/>
        <button>Buscar</button>
      </form>
    </div>
  );
};

export default Page;