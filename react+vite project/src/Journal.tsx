export default function Journal() {
  const headers = [
    "Date",
    "Symbol",
    "Market Bias",
    "Setup/Strategy",
    "Option Type",
    "Strike",
    "Entry(size@price)",
    "Stop(Risk Mgmt ~0.5*)",
    "Target(1.5R)",
    "Outcome",
    "Rule Adherence(%)",
    "Entry Quality(fit setup?)",
    "Emotional State",
    "Why this trade?",
    "Chart Screenshot",
  ];
  const listHeaders = headers.map((header) => {
    return (
      <th scope="col" className="px-6 py-4">
        {header}
      </th>
    );
  });
  return (
    <div id="Journal" className="place-items-center">
      <h1>DayTrading Journal</h1>
      <div>
        <img
          className="mt-5 rounded-lg rounded-md rounded-sm rounded-xl"
          src="https://i.imgur.com/jA8hHMpm.jpg"
          alt="Katsuko Saruhashi"
        />
      </div>
      {/* <!-- Table responsive wrapper --> */}
      <div className=" table-wrapper mt-15 overflow-x-auto bg-white dark:bg-neutral-700 rounded-lg rounded-md rounded-sm rounded-xl">
        {/* <!-- Table --> */}
        <table className="editor_listing_table text-left text-sm whitespace-nowrap">
          {/* <!-- Table head --> */}
          <thead className="t-header uppercase tracking-wider border-b-2 dark:border-neutral-600">
            <tr>{listHeaders}</tr>
          </thead>

          {/* <!-- Table body --> */}
          <tbody>
            <tr className="border-b dark:border-neutral-600">
              <th scope="row" className="px-6 py-4">
                January
              </th>
              <td className="px-6 py-4">$129.99</td>
              <td className="px-6 py-4">30</td>
              <td className="px-6 py-4">In Stock</td>
            </tr>

            <tr className="border-b dark:border-neutral-600">
              <th scope="row" className="px-6 py-4">
                February
              </th>
              <td className="px-6 py-4">$89.50</td>
              <td className="px-6 py-4">25</td>
              <td className="px-6 py-4">In Stock</td>
            </tr>

            <tr className="border-b dark:border-neutral-600">
              <th scope="row" className="px-6 py-4">
                March
              </th>
              <td className="px-6 py-4">$69.99</td>
              <td className="px-6 py-4">40</td>
              <td className="px-6 py-4">In Stock</td>
            </tr>

            <tr className="border-b dark:border-neutral-600">
              <th scope="row" className="px-6 py-4">
                April
              </th>
              <td className="px-6 py-4">$449.99</td>
              <td className="px-6 py-4">5</td>
              <td className="px-6 py-4">In Stock</td>
            </tr>

            <tr className="border-b dark:border-neutral-600">
              <th scope="row" className="px-6 py-4">
                May
              </th>
              <td className="px-6 py-4">$24.95</td>
              <td className="px-6 py-4">50</td>
              <td className="px-6 py-4">In Stock</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
