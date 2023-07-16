import React from 'react'

const ContactMap = () => {
    return (
        <>
            <iframe
                width="100%"
                height="100%"
                className="absolute inset-0"
                frameborder="0"
                title="map"
                marginheight="0"
                marginwidth="0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61816.023962935345!2d75.87509978744238!3d14.455868269248052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bba25726a6222e5%3A0x4a120de147c6d472!2sDavanagere%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1685026979466!5m2!1sen!2sin"
                style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}>
            </iframe>

        </>
    )
}

export default ContactMap