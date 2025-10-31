import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  let [myData, setMyData] = useState([]);
  let [selectedproducts, setselectedproducts] = useState(null);
  let [popup, setPopup] = useState(false);
  let [srP, setSrp] = useState(null);
  let [vl, setVl] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let url = `https://dummyjson.com/products`;
    let res = await axios.get(url);
    let data = [];
    for (let i = 0; i < res.data.products.length; i++) {
      data.push(res.data.products[i]);
    }
    console.log(res.data.products);
    setMyData(data);
  }
  // async function matchData() {
  //   let url = `https://dummyjson.com/products`;
  //   let res = await axios.get(url);
  //   // let input = prompt("enter category ");
  //   for (let i = 0; i < res.data.products.length; i++) {
  //     console.log(res.data.products[i].category);
  //   }
  // }
  // matchData();

  function matD(val) {
    if (val === null || val === "") {
      setSrp(null);
      return;
    }
    let md = [];
    for (let i = 0; i < myData.length; i++) {
      if (
        myData[i]["category"].toLowerCase().includes(vl.toLowerCase()) ||
        myData[i]["title"].toLowerCase().includes(vl.toLowerCase())
      ) {
        md.push(myData[i]);
        // return;
      }
      for (let u = 0; u < myData[i]["tags"].length; u++) {
        if (myData[i]["tags"][u].toLowerCase().includes(vl.toLowerCase())) {
          md.push(myData[i]);
          // return;
        }
      }
    }
    setSrp(md);
  }

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <input
        style={{ padding: "10px" }}
        value={vl}
        placeholder="Search Category"
        onChange={(e) => {
          setVl(e.target.value);
          matD(e.target.value);
        }}
      />
      {!srP ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "50px",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: "white",
            position: "relative",
          }}
        >
          {myData.map((d) => (
            <div
              onClick={() => {
                setPopup(true);
                setselectedproducts(d);
              }}
              style={{
                // backgroundColor: "white",
                border: "2px solid grey",
                position: "relative",
                width: "300px",
                height: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                borderRadius: "20px",
              }}
            >
              <img
                style={{ width: "80%", height: "80%", alignSelf: "center" }}
                src={d.images[0]}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "40px",
                  right: "2px",
                  textAlign: "center",
                  color: "white",
                  borderRadius: "2px",
                  width: "80px",
                  backgroundColor: "red",
                }}
              >
                ${d.price}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: "white",
                  backgroundColor: "black",
                  width: "100%",
                  height: "20%",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  // borderRadius: "20px",
                }}
              >
                {d.title}
              </div>
            </div>
          ))}
          {popup ? (
            <div
              style={{
                width: "100%",
                height: "100vh",
                background: "#00000080",
                position: "fixed",
                top: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  width: "700px",
                  height: "400px",

                  borderRadius: "20px",
                  display: "flex",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={selectedproducts.images[0]}
                    style={{ width: "80%", height: "80%" }}
                  />
                </div>
                <div
                  style={{
                    width: "50%",
                    height: "100%",
                    // border: "2px solid grey",
                    backgroundColor: "#f2f0eb",
                    // borderRadius: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      // backgroundColor: "yellow",
                      height: "40px",
                      padding: "20px",
                    }}
                  >
                    <button
                      onClick={() => setPopup(false)}
                      style={{
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                        // borderRadius: "100%",
                        border: "2px solid grey",
                        backgroundColor: "none",
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "26px",
                      fontWeight: "600",
                    }}
                  >
                    {selectedproducts.title}
                  </div>
                  <div
                    style={{
                      textAlign: "justify",
                      padding: "20px",
                      fontSize: "18px",
                    }}
                  >
                    {selectedproducts.description}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      style={{
                        padding: "10px 44px",
                        borderRadius: "20px",
                        border: "none",
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}

      {srP !== null ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "50px",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: "white",
            position: "relative",
          }}
        >
          {srP.map((d) => (
            <div
              onClick={() => {
                setPopup(true);
                setselectedproducts(d);
              }}
              style={{
                // backgroundColor: "white",
                border: "2px solid grey",
                position: "relative",
                width: "300px",
                height: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                borderRadius: "20px",
              }}
            >
              <img
                style={{ width: "80%", height: "80%", alignSelf: "center" }}
                src={d.images[0]}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "40px",
                  right: "2px",
                  textAlign: "center",
                  color: "white",
                  borderRadius: "2px",
                  width: "80px",
                  backgroundColor: "red",
                }}
              >
                ${d.price}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: "white",
                  backgroundColor: "black",
                  width: "100%",
                  height: "20%",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  // borderRadius: "20px",
                }}
              >
                {d.title}
              </div>
            </div>
          ))}
          {popup ? (
            <div
              style={{
                width: "100%",
                height: "100vh",
                background: "#00000080",
                position: "fixed",
                top: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  width: "700px",
                  height: "400px",

                  borderRadius: "20px",
                  display: "flex",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={selectedproducts.images[0]}
                    style={{ width: "80%", height: "80%" }}
                  />
                </div>
                <div
                  style={{
                    width: "50%",
                    height: "100%",
                    // border: "2px solid grey",
                    backgroundColor: "#f2f0eb",
                    // borderRadius: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      // backgroundColor: "yellow",
                      height: "40px",
                      padding: "20px",
                    }}
                  >
                    <button
                      onClick={() => setPopup(false)}
                      style={{
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                        // borderRadius: "100%",
                        border: "2px solid grey",
                        backgroundColor: "none",
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "26px",
                      fontWeight: "600",
                    }}
                  >
                    {selectedproducts.title}
                  </div>
                  <div
                    style={{
                      textAlign: "justify",
                      padding: "20px",
                      fontSize: "18px",
                    }}
                  >
                    {selectedproducts.description}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      style={{
                        padding: "10px 44px",
                        borderRadius: "20px",
                        border: "none",
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
