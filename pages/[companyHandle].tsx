import Tabs from "../components/genericComponents/tabs/tabs.component";
import Tab from "../components/genericComponents/tabs/tab.component";
import CompanyHeader from "../components/genericComponents/companyHeader/companyHeader";
import CompanyOverview from "../components/appComponents/company/companyOverview";
import { GetStaticPaths, GetStaticProps } from "next";
import { connectToDatabase } from "../lib/mongodb";
import Head from "next/head";

export default function CompanyPage({ companyInfo }) {
  return (
    <div>
      <Head>
        <title>Bhallagena - {companyInfo.company_name}</title>
      </Head>
      <CompanyHeader
        title={companyInfo.company_name}
        logoSrc={companyInfo.logo_link}
      />
      <Tabs className={"mt-6"} defaultTab="info">
        <Tab key="info" title="Company overview">
          <CompanyOverview info={companyInfo} />
        </Tab>
        <></>
      </Tabs>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths<any> = async (context) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any> = async (context) => {
  const { companyHandle } = context.params;

  const client = await connectToDatabase();
  const db = client.db("cp-db");

  // Get  company info by if from collection
  const companyInfo = await db
    .collection("company-info")
    .findOne({ _id: companyHandle } as any);

  if (!companyInfo)
    return {
      notFound: true,
    };

  return {
    props: {
      companyInfo,
    },
  };
};
