import React, { useEffect } from "react";
import "./servicescreen.css";
import AOS from "aos";
import "aos/dist/aos.css";
import modular from "../assets/services/modular interiors.jpg";
import fullHome from "../assets/services/full home interiors.jpg";
import luxury from "../assets/services/luxury interiors.jpg";
import renovate from "../assets/services/renovate.jpg";
import commercial from "../assets/services/commercial.jpg";
import furniture from "../assets/services/furniture.jpg";


const ServicesScreen = () => {

useEffect(() => {
AOS.init({duration:1000})

window.scrollTo(0,0);
},[])

  return (
    <div className="ss-wrapper">
      <h1 style={{marginBottom:"120px",marginTop:"35px"}}>Services we offer</h1>

      {/* service card */}
      <div className="service-card">
        {/* image wrapper */}

        <div className="s-img-wrapper" data-aos="fade-right">
         <img src={modular} alt="modular"/>
        </div>


        {/* image info */}

        <div className="s-info-wrapper">

        <div className="s-heading-wrapper" data-aos="fade-down">
        <h1 style={{textDecoration:"underline"}}>Modular Interiors</h1>
         <h3>Transform Your Space with Modular Interior Service</h3>
        </div>
         

         
         <div data-aos="fade-left">Our modular interior service offers a versatile and dynamic solution for enhancing your living or working environment. Whether you're looking to revamp a single room or renovate an entire space, our team of experienced designers and craftsmen will work with you every step of the way to create a customized solution that meets your needs and exceeds your expectations.</div>

         <br/>
         <br/>

         <div data-aos="fade-left">With modular interior design, we prioritize flexibility, functionality, and style. Our modular approach allows for seamless integration of various components, such as furniture, storage units, partitions, and decorative elements, enabling easy customization and reconfiguration to adapt to changing needs or preferences.</div>


         <br/>
         <br/>
         <div data-aos="fade-left">From concept to completion, we collaborate closely with our clients to understand their vision, preferences, and requirements. Our designers leverage their expertise to craft innovative design concepts that maximize space utilization, optimize functionality, and enhance aesthetic appeal.</div>

         <br/>
         <br/>

         <div data-aos="fade-left">
         Once the design is finalized, our skilled craftsmen bring the vision to life using high-quality materials and precision manufacturing techniques. Whether it's modular furniture pieces, modular wall systems, or modular storage solutions, we ensure superior craftsmanship and attention to detail in every aspect of the project.
         </div>
         
        </div>
      </div>

      {/* full home interiors */}
      <div className="service-card">
        

        {/* image info */}

        <div className="s-info-wrapper">

        <div className="s-heading-wrapper" data-aos="fade-down">
        <h1 style={{textDecoration:"underline"}}>Full Home Interiors</h1>
         <h3>Elevate Your Living Space with Our Full Home Interior Service</h3>
        </div>
         

         
         <div data-aos="fade-right">Our full home interior service is your comprehensive solution for creating a harmonious, stylish, and functional living environment that reflects your unique personality and lifestyle. From concept to completion, our team of experienced designers, architects, and craftsmen will guide you through every step of the process, ensuring a seamless and stress-free experience.</div>

         <br/>
         <br/>

         <div data-aos="fade-right">Our approach begins with a thorough consultation to understand your vision, preferences, and budget. Whether you're looking to renovate a single room or overhaul your entire home, we'll work closely with you to develop a customized design plan that aligns with your aesthetic and practical needs.</div>


         <br/>
         <br/>
         <div data-aos="fade-right">With a keen eye for detail and a commitment to quality, our designers will craft a cohesive interior design scheme that encompasses everything from furniture selection and layout to color palette, lighting design, and decorative accents. We'll explore different styles, materials, and finishes to create a personalized look that suits your taste and enhances the architectural features of your home.</div>

         <br/>
         <br/>

         <div data-aos="fade-right">
         Once the design concept is approved, our skilled craftsmen will bring it to life with meticulous attention to detail and superior workmanship. Whether it's custom cabinetry, built-in shelving, bespoke furniture pieces, or intricate trim work, we'll ensure that every element is expertly crafted and installed to perfection.
         </div>
         
        </div>

        {/* image wrapper */}

        <div className="s-img-wrapper" data-aos="fade-left">
         <img src={fullHome} alt="modular"/>
        </div>

      </div>

      {/* Luxury Interiors */}
      <div className="service-card">
        {/* image wrapper */}

        <div className="s-img-wrapper" data-aos="fade-right">
         <img src={luxury} alt="modular"/>
        </div>


        {/* image info */}

        <div className="s-info-wrapper">

        <div className="s-heading-wrapper" data-aos="fade-down">
        <h1 style={{textDecoration:"underline"}}>Luxury Interiors</h1>
         <h3>Indulge in Opulence with Our Luxury Interior Service</h3>
        </div>
         

         
         <div data-aos="fade-left">Step into a world of elegance and sophistication with our luxury interior service, where every detail is meticulously curated to reflect your discerning taste and elevate your living space to new heights of opulence.</div>

         <br/>
         <br/>

         <div data-aos="fade-left">From luxurious residences to prestigious commercial spaces, our team of renowned designers and craftsmen specializes in creating bespoke interiors that exude timeless beauty, unmatched quality, and unparalleled luxury.</div>


         <br/>
         <br/>
         <div data-aos="fade-left">Beginning with a private consultation, we take the time to understand your unique vision, aspirations, and lifestyle. Whether you seek a classic, contemporary, or avant-garde aesthetic, our designers will collaborate with you to conceptualize a design scheme that epitomizes refined luxury and surpasses your expectations.</div>

         <br/>
         <br/>

         <div data-aos="fade-left">
         Drawing inspiration from the finest materials, textures, and finishes, we meticulously craft every element of your interior, from custom furnishings and sumptuous fabrics to exquisite lighting and artisanal accents. Our unwavering commitment to excellence ensures that every detail is executed to perfection, resulting in a space that exudes sophistication and indulgence.
         </div>

         <br/>
         <br/>

         <div data-aos="fade-left">
         Throughout the design and implementation process, our dedicated team of professionals will manage every aspect of your project with meticulous attention to detail, ensuring seamless execution, timely delivery, and uncompromising quality.
         </div>
         
        </div>
      </div>

      {/* Renovations */}
      <div className="service-card">
        

        {/* image info */}

        <div className="s-info-wrapper">

        <div className="s-heading-wrapper" data-aos="fade-down">
        <h1 style={{textDecoration:"underline"}}>Renovations</h1>
         <h3>Renew, Refresh, and Revitalize Your Space with Our Renovation Service</h3>
        </div>
         

         
         <div data-aos="fade-right">Our renovation service is your partner in breathing new life into your home or commercial property. Whether you're looking to update a single room or undertake a complete overhaul, our experienced team is here to guide you through every step of the renovation process.</div>

         <br/>
         <br/>

         <div data-aos="fade-right">We begin by listening to your needs, goals, and aspirations for the space. Whether you're seeking to modernize outdated features, enhance functionality, or simply inject a fresh aesthetic, our designers will work closely with you to develop a tailored renovation plan that aligns with your vision and budget.</div>


         <br/>
         <br/>
         <div data-aos="fade-right">With a keen eye for detail and a commitment to quality craftsmanship, our skilled contractors will execute the renovation with precision and care. From demolition to reconstruction, we'll handle every aspect of the project with professionalism and expertise, ensuring that timelines are met and disruptions are minimized.</div>

         <br/>
         <br/>

         <div data-aos="fade-right">
         Throughout the renovation process, we prioritize clear communication and transparency, keeping you informed and involved every step of the way. Our project managers will be readily available to address any questions or concerns that may arise, ensuring a smooth and stress-free experience from start to finish.
         </div>
         
        </div>

        {/* image wrapper */}

        <div className="s-img-wrapper" data-aos="fade-left">
         <img src={renovate} alt="modular"/>
        </div>

      </div>

      {/* commercial interiors */}
      <div className="service-card">
        {/* image wrapper */}

        <div className="s-img-wrapper" data-aos="fade-right">
         <img src={commercial} alt="commercial"/>
        </div>


        {/* image info */}

        <div className="s-info-wrapper">

        <div className="s-heading-wrapper" data-aos="fade-down">
        <h1 style={{textDecoration:"underline"}}>Commercial Interiors</h1>
         <h3>Elevate Your Business Environment with Our Commercial Interior Service</h3>
        </div>
         

         
         <div data-aos="fade-left">Our commercial interior service offers comprehensive solutions tailored to meet the unique needs and objectives of your business. Whether you're establishing a new office, refreshing an existing space, or reimagining your retail environment, our experienced team is dedicated to creating functional, inspiring, and impactful interiors that resonate with your brand identity and enhance the customer experience.</div>

         <br/>
         <br/>

         <div data-aos="fade-left">From the initial consultation to the final installation, we collaborate closely with you to understand your vision, goals, and budgetary considerations. Whether you prioritize functionality, aesthetics, or both, our designers will develop a customized plan that maximizes space utilization, fosters productivity, and reflects your brand values.</div>


         <br/>
         <br/>
         <div data-aos="fade-left">With a focus on quality craftsmanship and attention to detail, our skilled contractors will bring your vision to life with precision and efficiency. Whether it's installing custom millwork, integrating innovative technology, or optimizing lighting and acoustics, we ensure that every aspect of your commercial interior meets the highest standards of design and functionality.</div>

         <br/>
         <br/>

         <div data-aos="fade-left">
         Throughout the project, our project managers will oversee all aspects of the construction process, ensuring that timelines are met, budgets are adhered to, and disruptions to your business operations are minimized. We understand the importance of clear communication and transparency, and we're committed to keeping you informed and involved every step of the way.
         </div>
         
        </div>
      </div>

      {/* furniture & Decor */}
      <div className="service-card">
        

        {/* image info */}

        <div className="s-info-wrapper">

        <div className="s-heading-wrapper" data-aos="fade-down">
        <h1 style={{textDecoration:"underline"}}>Furniture and Decor</h1>
         <h3>Transform Your Space with Our Furniture and Decor Service</h3>
        </div>
         

         
         <div data-aos="fade-right">Our furniture and decor service is your one-stop destination for creating inviting, stylish, and functional interiors that reflect your unique personality and lifestyle. Whether you're furnishing a new home, refreshing an existing space, or seeking to elevate your commercial environment, our curated selection of furniture and decor pieces offers endless possibilities for customization and personalization.</div>

         <br/>
         <br/>

         <div data-aos="fade-right">With a keen eye for design trends and a passion for quality craftsmanship, our experienced team carefully selects each piece in our collection to ensure superior style, comfort, and durability. From sofas and dining sets to lighting fixtures and decorative accessories, we offer an extensive range of options to suit every taste and budget.</div>


         <br/>
         <br/>
         <div data-aos="fade-right">Beyond our curated collection, our design experts are on hand to provide personalized guidance and recommendations tailored to your specific needs and preferences. Whether you're seeking a cohesive design scheme for your entire space or searching for that perfect statement piece to tie the room together, we're here to help you bring your vision to life.</div>

         <br/>
         <br/>

         <div data-aos="fade-right">
         Once you've selected your furniture and decor pieces, our dedicated team of professionals will coordinate delivery and installation with precision and care. Whether you're outfitting a single room or an entire property, we'll ensure that every item is placed with meticulous attention to detail, creating a seamless and inviting environment that inspires and delights.
         </div>
         
        </div>

        {/* image wrapper */}

        <div className="s-img-wrapper" data-aos="fade-left">
         <img src={furniture} alt="modular"/>
        </div>

      </div>



    </div>
  );
};

export default ServicesScreen;
