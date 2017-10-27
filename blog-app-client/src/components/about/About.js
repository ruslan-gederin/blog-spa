import React, {Component} from 'react';
import InformationCard from './InformationCard'

export default class About extends Component {

    createInformationCardData(title, info, link, buttonText) {
        return {title, info, link, buttonText};
    }

    render() {

        const authorData = this.createInformationCardData('Ruslan Gederin',
                                                          'Author of this blog. Java developer in Lohika company (Odessa) with more than 5 years of experience '
                                                          + 'in Java and Java-related technologies focusing on backend side.',
                                                          'https://www.linkedin.com/in/ruslan-gederin-588132127/',
                                                          'View Linkedin profile');

        const companyData = this.createInformationCardData('Lohika LTD',
                                                           'Lohika is a premier software development firm that provides self-managed, elite engineering teams to rapidly scale product development capacity and accelerate the release of products.',
                                                           'http://www.lohika.com/',
                                                           'Lohika web site');
        return (
            <div className="row about-component">
                <div className="col-md-1"/>
                <div className="col-md-5">
                    <InformationCard
                        informationCardData={authorData}
                    />
                </div>
                <div className="col-md-5">
                    <InformationCard
                        informationCardData={companyData}
                    />
                    <div className="col-md-1"/>
                </div>
            </div>
        );
    }
}