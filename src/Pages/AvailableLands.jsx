
import Tractor from "../components/Tractor";
import tracImage from "../assets/tractor blue.png.png";
import tracImage1 from "../assets/tractor red.png.png";
import tracImage2 from "../assets/tractor yellow.png.png"
import Footer from "../components/Footer";
import NavBarTractor from "../components/NavBarTractor";
function AvailableLands() {
  return (
    <>
      <div className="tractorBackground">
      <NavBarTractor />

        <div className="majorparagraph">
          <div className="paragraph">Tractor</div>
        </div>

      </div>
      <div>
     <h2> Available Tractors</h2>
      <div>
        <div className="AvailableTractors">
          <div className="tractors">
            <Tractor
              img={tracImage}
              type={"LS XG3025H Tractor,"}
              location={"Dadin Kowa"}
              price={"#20,000"}
              rent-btn={"Rent"}
            />
          </div>
          <div className="tractors">
            <Tractor
              img={tracImage1}
              type={"40-90 HP landscape Tractor,diesel 4W,D275-1160"}
              location={"Dadin Kowa"}
              price={"#20,000"}
              rent-btn={"Rent"}
            />
          </div>
          <div className="tractors">
            <Tractor
              img={tracImage1}
              type={"Kioti CK2510,diesel 4WD,275-1460"}
              location={"Dadin Kowa"}
              price={"#20,000"}
              rent-btn={"Rent"}
            />
          </div>
          <div className="tractors">
            <Tractor
              img={tracImage2}
              type={"60-90 HP Skid loader Tractor,diesel 4WD,275-2200"}
              location={"Dadin Kowa"}
              price={"#20,000"}
              rent-btn={"Rent"}
            />
          </div>
          <div className="tractors">
            <Tractor
              img={tracImage}
              type={"LS XG3025H Tractor,diesel 4WD,275-1460"}
              location={"Dadin Kowa"}
              price={"#20,000"}
              rent-btn={"Rent"}
            />
          </div>
          <div className="tractors">
            <Tractor
              img={tracImage1}
              type={"40-90 HP landscape Tractor,diesel 4WD,275-1160"}
              location={"Dadin Kowa"}
              price={"#20,000"}
              rent-btn={"Rent"}
            />
          </div>
          <div className="tractors">
            <Tractor
              img={tracImage1}
              type={"Kioti CK2510,diesel 4WD,275-1460"}
              location={"Dadin Kowa"}
              price={"#20,000"}
              rent-btn={"Rent"}
            />
          </div>
          <div className="tractors">
            <Tractor
              img={tracImage2}
              type={"60-90 HP Skid loader Tractor,diesel 4WD,275-2200"}
              location={"Dadin Kowa"}
              price={"#20,000"}
              rent-btn={"Rent"}
            />
          </div>
          <div className="tractors">
            <Tractor
              img={tracImage}
              type={"LS XG3025H Tractor,"}
              location={"Dadin Kowa"}
              price={"#20,000"}
              rent-btn={"Rent"}
            />
          </div>
          <div className="tractors">
            <Tractor
              img={tracImage1}
              type={"40-90 HP landscape Tractor,diesel 4WD,275-1160"}
              location={"Dadin Kowa"}
              price={"#20,000"}
              rent-btn={"Rent"}
            />
          </div>
          <div className="tractors">
            <Tractor
              img={tracImage1}
              type={"Kioti CK2510,diesel 4WD,275-1460"}
              location={"Dadin Kowa"}
              price={"#20,000"}
              rent-btn={"Rent"}
            />
          </div>
          <div className="tractors">
            <Tractor
              img={tracImage2}
              type={"60-90 HP Skid loader Tractor,diesel 4WD,275-2200"}
              location={"Dadin Kowa"}
              price={"#20,000"}
              rent-btn={"Rent"}
            />
          </div>
        </div>
      </div>
      </div>
        <Footer />
    </>
  );
}

export default AvailableLands;
