import React from "react";

const InformationCard = ({informationCardData}) => {

    return (
        <div className="card">
            <div className="card-block">
                <h4 className="card-title">{informationCardData.title}</h4>
                <p className="card-text">{informationCardData.info}</p>
                <a href={informationCardData.link}
                   className="btn btn-primary">{informationCardData.buttonText}</a>
            </div>
        </div>
    );

};

export default InformationCard


