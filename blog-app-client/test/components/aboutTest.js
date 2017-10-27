import {renderComponent, expect} from '../testHelper';
import About from '../../src/components/about/About';

describe('About component ', () => {

    let component;

    beforeEach(()=> {
        component = renderComponent(About);
    });

    it('has correct class', () => {
        expect(component).to.have.class('about-component')
    });

    it('shows author name', () => {
        expect(component).to.contain('Ruslan Gederin');
    });

    it('shows author information', () => {
        expect(component).to.contain(
            'Author of this blog. Java developer in Lohika company (Odessa) with more than 5 years of experience in Java and Java-related technologies focusing on backend side.');
    });

    it('shows company name', () => {
        expect(component).to.contain('Lohika LTD');
    });

    it('shows company information', () => {
        expect(component).to.contain(
            'Lohika is a premier software development firm that provides self-managed, elite engineering teams to rapidly scale product development capacity and accelerate the release of products.');
    });

    it('has links', () => {
        expect(component.find('a')).to.exist;
    });

});



