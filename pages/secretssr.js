import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { authorizeUser, withAuth } from "@/utils/auth0";

const SecretSSR = ({ user, title }) => {
  debugger;
  return (
    <BaseLayout user={user} loading={false}>
      <BasePage>
        <h1>I am Secret Page - Hello {user && user.name}</h1>
        <h2>{title}</h2>
      </BasePage>
    </BaseLayout>
  );
};

// export const getServerSideProps = async ({req, res}) => {
//   const user = await authorizeUser(req, res);

//   return {
//     props: { user }
//   }
// }

const getTitle = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ title: "My new title!" });
    }, 500);
  });
};

// withAuth has to invoke the function arg inside
export const getServerSideProps = withAuth(async ({ req, res }, user) => {
  const title = await getTitle();
  return title;
})();

export default SecretSSR;
