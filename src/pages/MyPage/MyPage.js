import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./MyPage.css";
import { useSelector } from "react-redux";
import instance from "../../axios";

export default function MyPage() {
  const userData = useSelector((state) => state.auth.data);
  const [coins, setCoins] = useState(0);
  React.useEffect(() => {
    const getCoins = async () => {
      if (userData) {
        try {
          const data = await instance.get(`/user/coins/${userData?.recordId}`);
          setCoins(data.data.coins);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getCoins();
  }, [userData]);

  return (
    <div className="background-custom">
      <Header />
      <div className="container d-flex justify-content-center align-items-center mt-5 ">
        <div className="card">
          <div className="upper">
            <img
              src="https://i.imgur.com/Qtrsrk5.jpg"
              className="img-fluid"
              alt=""
            />
          </div>

          <div className="user text-center mt-3">
            <div className="profile">
              <img
                src="https://lisashaman.ru/image/cache/data/phototestimonial/no_foto-600x600.jpg"
                className="rounded-circle"
                width="80px"
                alt=""
              />
            </div>
          </div>
          <br />
          <div className="mt-5 text-center">
            <h4 className="mb-0 fs-1">{userData?.nickName}</h4>
            <div className="d-flex justify-content-center align-items-center mt-4 px-4">
              <div className="stats">
                <h6 className="mb-0 fs-3">Монеты</h6>
                <span>{coins}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
