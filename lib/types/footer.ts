export interface FooterProps {
    header: {
      title: string;
      cta: string;
    };
    brand: {
      name: string;
      description: string;
    };
    navigation: {
      title: string;
      links: {
        home: string;
        aboutUs: string;
        service: string;
        resume: string;
        project: string;
      };
    };
    contact: {
      title: string;
      phone: string;
      website: string;
      email: string;
    };
    newsletter: {
      title: string;
      placeholder: string;
      ariaLabel: string;
    };
    copyright: {
      text: string;
      brandName: string;
      rights: string;
    };
    legal: {
      terms: string;
      privacy: string;
      separator: string;
    };
    socialMedia: {
      ariaLabels: {
        facebook: string;
        behance: string;
        youtube: string;
        twitter: string;
        instagram: string;
      };
    };
}