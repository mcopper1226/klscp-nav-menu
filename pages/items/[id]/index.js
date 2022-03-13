import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Dynamic Page: {id}</p>;
};

export default Page;
