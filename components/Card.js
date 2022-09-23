import { artists } from "../data/artists";

const Card = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center">
        {artists.length !== 0 &&
          artists.map((data) => (
            <div className="p-5" key={data.name + data.community}>
              <div className="flex flex-col md:flex-row max-w-xs  md:max-w-lg rounded-lg bg-white shadow-lg">
                <img
                  className="w-full h-42 rounded-t-lg md:rounded-none md:rounded-l-lg"
                  src={data.bee}
                  alt=""
                />
                <div className="p-2 flex flex-col justify-start text-center">
                  <h5 className="text-gray-900 text-xl font-medium">
                    {data.name}
                  </h5>
                  <h5 className="text-gray-900 text-sm font-medium mb-2">{data.community}</h5>
                  <p className="text-gray-700 text-base">{data.bio}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Card;
