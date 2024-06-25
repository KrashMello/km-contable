const colors = {
  green: ["bg-green-400", "bg-green-600"],
  red: ["bg-red-400", "bg-red-600"],
  yellow: ["bg-yellow-400", "bg-yellow-600"],
  default: ["bg-gray-400", "bg-gray-600"],
};
type color = keyof typeof colors;

const InfoBox = ({
  color = "default",
  title = "title",
  amount = 0,
  currency = "$",
}: {
  color: color;
  title: string;
  amount: number;
  currency: string;
}) => {
  return (
    <div
      className={`${colors[color][0]} text-white  flex flex-col gap-2 overflow-hidden h-fit w-52 rounded-sm drop-shadow-md`}
    >
      <div className="flex justify-between items-center px-2">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-normal">{`${currency} ${amount}`}</span>
          <span className="text-sm font-semibold">{title}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 48 48"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M32.5 8.5v9a2 2 0 0 0 2 2h9v18a2 2 0 0 1-2 2h-35a2 2 0 0 1-2-2v-27a2 2 0 0 1 2-2Zm11 11l-11-11"
          />
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M27.99 30H20l4-6l-3.99-6H28m13.62-.38V6a1.69 1.69 0 0 0-1.9-1.68L6.5 8.5"
          />
        </svg>
      </div>
      <div className={`flex justify-center w-full ${colors[color][1]}`}>
        <button className="text-white text-sm flex items-center gap-2">
          <span className="font-semibold">More Info</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="size-4"
          >
            <path
              fill="currentColor"
              d="m12 16l4-4l-4-4l-1.4 1.4l1.6 1.6H8v2h4.2l-1.6 1.6zm0 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default InfoBox;
