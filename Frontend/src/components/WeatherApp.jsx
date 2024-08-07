import { useEffect, useState } from "react";
import axios from "axios";
import Landing from "./Landing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);

  const fetchApiData = async () => {
    const customId = 123;
    const unwantedErr = 321;
    try {
      const res = await axios.get(`https://weatherapp-backend-1eg6.onrender.com/weather?city=${city}`);
      setWeatherInfo(res.data);
      console.log(res.data); // weather data
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("Please enter a correct city/town. (Hint: There is a typo🏌️)", {
          theme: "dark",
          toastId: customId,
        });
      } else {
        toast.error(error.response.status + ": Unwanted error, we're working on a fix.", {
          theme: "dark",
          toastId: unwantedErr,
        });
      }
    }
  };

  const inputHandler = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await fetchApiData(city);
  };

  const lightRain = new Set([300, 301, 310, 500, 520]);
  const heavyRain = new Set([
    302, 312, 313, 314, 321, 501, 502, 503, 504, 511, 521, 531,
  ]);
  const lightSnow = new Set([600, 601, 611, 612, 613, 615, 620]);
  const heavySnow = new Set([602, 616, 621, 622]);
  const clearSky = new Set([800, 701, 711, 721]);
  const clouds = new Set([
    771, 762, 761, 751, 741, 731, 781, 801, 802, 803, 804,
  ]);
  const thunderstorm = new Set([
    200, 201, 202, 210, 211, 212, 221, 230, 231, 232,
  ]);

  return (
    <>
      <div className="rounded-lg backdrop-blur-3xl bg-white/5 h-auto w-full max-w-md mx-auto p-4">
        <div className="flex flex-col justify-center items-center font-Quicksand h-full space-y-4">
          <form onSubmit={submitHandler} className="w-full">
            <div className="grid grid-cols-4 ">
              <input
                type="text"
                placeholder="Enter a city/town"
                value={city}
                onChange={inputHandler}
                className="placeholder:text-gray-300 text-white px-4 py-3 rounded-l-lg focus:outline-none bg-white/5 backdrop-3xl col-span-3"
              ></input>
              <button
                type="submit"
                className="placeholder:text-gray-300 text-white px-4 py-3 rounded-r-lg bg-white/5 backdrop-3xl"
              >
                Search
              </button>
            </div>
          </form>

          <div className="w-full ">
            {weatherInfo ? (
              <div className="flex flex-col items-center">
                <div className="relative">
                  {thunderstorm.has(weatherInfo.weather[0].id) && (
                    <img src="./thunder.svg" className="h-36 md:h-72" alt="" />
                  )}
                  {lightRain.has(weatherInfo.weather[0].id) && (
                    <img
                      src="./light-rain.svg"
                      className="h-36 md:h-60"
                      alt=""
                    />
                  )}
                  {heavyRain.has(weatherInfo.weather[0].id) && (
                    <img
                      src="./heavy-rain.svg"
                      className="h-36 md:h-60"
                      alt=""
                    />
                  )}
                  {clearSky.has(weatherInfo.weather[0].id) && (
                    <img src="./day.svg" className="h-36 md:h-60" alt="" />
                  )}
                  {lightSnow.has(weatherInfo.weather[0].id) && (
                    <img
                      src="./light-snow.svg"
                      className="h-36 md:h-60"
                      alt=""
                    />
                  )}
                  {heavySnow.has(weatherInfo.weather[0].id) && (
                    <img
                      src="./heavy-snow.svg"
                      className="h-36 md:h-60"
                      alt=""
                    />
                  )}
                  {clouds.has(weatherInfo.weather[0].id) && (
                    <img src="./cloudy.svg" className="h-36 md:h-60" alt="" />
                  )}
                </div>

                <div className="text-slate-300 text-center w-[340px] ">
                  <div className="mb-5">
                    <p className="text-4xl md:text-6xl">
                      {Math.round(weatherInfo.main.temp)}°C
                    </p>
                    <h2 className="text-2xl">{weatherInfo.name}</h2>
                  </div>
                  <div className="flex justify-between space-x-4">
                    <div className="text-[17px] text-left flex-initial w-1/2 space-y-1">
                      <p>Feels like {weatherInfo.main.feels_like} °C</p>
                      <p>Pressure: {(weatherInfo.main.pressure)} hPa</p>
                      <p className="">Min Temp: {weatherInfo.main.temp_min}°C</p>
                    </div>
                    <div className="text-[17px] text-right space-y-1 md:space-y-0">
                      <p className="capitalize">
                        {weatherInfo.weather[0].description}
                      </p>
                      <p>Cloud Cover: {weatherInfo.clouds.all}%</p>
                      <p className="">Max Temp: {weatherInfo.main.temp_max}°C</p>
                      <p>{weatherInfo.icon}</p>
                    </div>
                  </div>
                  <div className="flex flex-row w-full md:flex-row justify-around sm:flex-row sm:justify-between text-lg md:text-xl space-x-12 mt-3">
                    <div className=" flex items-center space-x-2 md:space-x-4">
                      <img src="humidity-50.png" alt="Humidity Icon" className="h-6 w-6" />
                      <p>{weatherInfo.main.humidity + "%"}</p>
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-4">
                      <img src="wind.svg" alt="Wind Speed Icon" className="h-6 w-6" />
                      <p>{(weatherInfo.wind.speed * 3.6).toFixed(2)} km/hr</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Landing />
            )}
          </div>
        </div>
      </div>
      <div className="font-mono text-xl absolute bottom-0 bg-white/5 w-full flex justify-center">
        <span>made by&nbsp;</span>
        <a href="https://github.com/sahiwl" target="_blank" className="text-indigo-400 font-semibold">
          &copy;Sahil
        </a>
      </div>
      <ToastContainer pauseOnFocusLoss={false} limit={1} autoClose={3500} />
    </>
  );
};

export default WeatherApp;