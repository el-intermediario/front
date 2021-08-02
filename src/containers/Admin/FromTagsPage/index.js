import React, { useState } from "react";
import BannerSection from "../../../components/BannerSection";
import FollowUs from "../../../components/FollowUs";
import SimpleReactValidator from "simple-react-validator";

const FormTagsPage = () => {
    const validator = new SimpleReactValidator();
    const [name, setName] = useState("");
    
    const submitHandler = async (event) => {
    event.preventDefault();
    const data = {
        name,
    };
    try {
    const response = await api.tag.add(data, {
        header: { "Content-Type": "application/json" },
    });
    if (response) {
        console.log(response.data);
    }
    } catch (error) {
    console.log(error);
    }
};

return (
    <>
    <div className="contact_form padding-bottom">
        <div className="container">
        <div className="space-50" />
        <div className="row">
            <div className="col-lg-8">
            <div className="cotact_form">
                <div className="row">
                <div className="col-12">
                    <h3>Crear Tag!</h3>
                </div>
                <div className="col-12">
                    <form onSubmit={submitHandler}>
                    <div className="row">
                        <div className="col-lg-6">
                        <input
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="name"
                        />
                        </div>
                        <div className="col-12">
                        <div className="space-20" />
                        <button className="cbtn1" type="submit">
                            Guardar
                        </button>
                        </div>
                        <div className="preview">
                          {/* {JSON.stringify(contentState, null, 4)} */}
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
            <div className="col-lg-4">
            <FollowUs title="Redes Sociales" />
            </div>
        </div>
        </div>
    </div>
    <BannerSection />
    </>
);
};

export default FormTagsPage;
