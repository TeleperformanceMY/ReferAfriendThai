document.addEventListener("DOMContentLoaded", function() {
    const idForm = document.getElementById("id-form");
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const generatedLink = document.getElementById("generated-link");
    const shareButtonWhatsApp = document.getElementById("share-button-whatsapp");
    const shareButtonLine = document.getElementById("share-button-line");
    const qrCodeContainer = document.getElementById("qr-code");
    const qrImg = document.getElementById('qrImg');
    const qrBox = document.getElementById('qrBox');

    idForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const id = document.getElementById("id").value;
        
        // Generate the link using the entered ID number
        const link = `https://careerseng-teleperformance.icims.com/jobs/40195/telesales-executive---thai-speaker/job?mode=job&iis=RAF&iisn=${id}`;
        
        // Update the generated link display as a clickable link
        generatedLink.innerHTML = `<a href="${link}" target="_blank" class="generated-link">${link}</a>`;
        
        // Generate QR code for the link
        generateQrCode(link);
        
        // Show step 2 and hide step 1
        step1.style.display = "none";
        step2.style.display = "block";
    });

    shareButtonWhatsApp.addEventListener("click", function() {
        const link = generatedLink.textContent;
        const message = `Check out this link: ${link}`;

        // Create a shareable link for WhatsApp
        const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

        // Open WhatsApp share link in a new window
        window.open(whatsappLink, "_blank");
    });

    shareButtonLine.addEventListener("click", function() {
        const link = generatedLink.textContent;
        const message = `Check out this link: ${link}`;
    
        // Create a shareable link for LINE
        const lineLink = `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;
    
        // Open LINE share link in a new window
        window.open(lineLink, "_blank");
    });
    

    function generateQrCode(link) {
        // Check if the input field is empty
        if (link.trim() === "") {
            alert("Please enter text to generate a QR code.");
            return;
        }

        // Construct the URL for the qrserver.com API
        const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(link)}`;

        // Generating image 
        qrImg.src = apiUrl;
        qrBox.setAttribute("id", "qrBoxGenerated");
    }

    function generateQrCodeWithLogo(link, logoUrl) {
        // Check if the input fields are empty
        if (link.trim() === "" || logoUrl.trim() === "") {
            alert("Please enter both link and logo URL to generate a QR code with logo.");
            return;
        }
    
        // Generate QR code without logo using qrserver.com API
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(link)}`;
    
        // Create a new image element for the QR code
        const qrImage = new Image();
    
        // Set the source of the image to the QR code URL
        qrImage.src = qrUrl;
    
        // Once the QR code image is loaded
        qrImage.onload = function() {
            // Create a new image element for the logo
            const logoImage = new Image();
    
            // Set the source of the logo image to the logo URL
            logoImage.src = logoUrl;
    
            // Once the logo image is loaded
            logoImage.onload = function() {
                // Create a canvas element to draw the combined image
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
    
                // Set the canvas dimensions to match the QR code dimensions
                canvas.width = qrImage.width;
                canvas.height = qrImage.height;
    
                // Draw the QR code onto the canvas
                ctx.drawImage(qrImage, 0, 0, qrImage.width, qrImage.height);
    
                // Calculate the position to center the logo on the QR code
                const x = (qrImage.width - logoImage.width) / 2;
                const y = (qrImage.height - logoImage.height) / 2;
    
                // Draw the logo onto the QR code
                ctx.drawImage(logoImage, x, y, logoImage.width, logoImage.height);
    
                // Display the canvas with the QR code and logo
                qrCodeContainer.innerHTML = '';
                qrCodeContainer.appendChild(canvas);
            };
        };
    }
    
});
