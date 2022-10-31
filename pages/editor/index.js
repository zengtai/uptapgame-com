import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getOriginalData } from "../../lib/api";

export default function Editor({ data }) {
  const [selected, setSelected] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  // console.log(`data: `, data);
  let categories = data.map((i) => i.category.name);
  categories = [...new Set(categories)];
  let dataByCategory = [];

  categories.forEach((i) => {
    let tmp = data.slice().filter((g) => g.category.name === i);
    dataByCategory.push({
      name: i,
      slug: i.toLowerCase().replace(/\./, ``).replace(/\s/, `-`),
      data: tmp.map((j) => ({
        id: j.id,
        appid: j.appid,
        description: j.description,
        creation_date: j.creation_date,
      })),
    });
  });

  // console.log(`categories: `, categories);
  // console.log(`dataByCategory: `, dataByCategory);

  useEffect(() => {
    let dashboard = document.querySelector(".dashboard");

    function handleClick(e) {
      console.log(`Target: `, e.target);
      let t = e.target.value;
      if (selected.includes(t)) {
        setSelected(() => selected.splice(selected.indexOf(t), 1));
      }
      // console.log(`Selected: `, selected);
      // console.log(`idx: `, idx);
    }

    dashboard.addEventListener(`click`, handleClick);

    return () => {
      dashboard.removeEventListener(`click`, handleClick);
    };
  }, [selected]);

  return (
    <Layout>
      <Head>
        <title>Editor</title>
      </Head>
      <div className="dashboard mx-3 xl:mx-12">
        <h2 className="my-3 text-lg">Categories</h2>
        <ul className="mb-3 flex flex-wrap gap-2">
          {dataByCategory.map((i) => (
            <li key={i.slug}>
              <button value={i.slug} className="rounded-md bg-slate-200 p-3">
                {i.name}
              </button>
            </li>
          ))}
        </ul>
        <hr />
        <p className="my-3 flex flex-wrap gap-3">
          {selected.length
            ? selected.map((i) => <span key={i}>{i}</span>)
            : `No Data`}
        </p>
      </div>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  const originalData = await getOriginalData();

  return {
    props: {
      data: originalData,
    },
  };
};
