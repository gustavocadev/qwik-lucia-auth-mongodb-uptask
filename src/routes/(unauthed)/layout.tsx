import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { auth } from '~/lib/lucia';

export const useLoaderData = routeLoader$(async (event) => {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();

  console.log(
    'If there is a session redirect to /projects if not redirect to /'
  );
  if (session) throw event.redirect(303, '/projects');

  return {};
});

export default component$(() => {
  return (
    <main class="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center ">
      <section class="md:w-2/3 lg:w-2/5">
        <Slot />
      </section>
    </main>
  );
});
