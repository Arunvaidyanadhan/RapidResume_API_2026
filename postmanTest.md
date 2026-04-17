

## 📁 Step 1: Understanding the Template Structure

### Backend Templates Folder Location
```
resume-pdf-service/templates/
├── modern/
│   ├── template.ejs
│   └── styles.css
├── creative/
│   ├── template.ejs
│   └── styles.css
└── your-new-template/     ← You'll add yours here
    ├── template.ejs
    └── styles.css
```

### What Each File Does
- **`template.ejs`**: HTML structure with EJS placeholders for dynamic data
- **`styles.css`**: CSS specifically for PDF/print styling
- **Folder name**: Becomes the template ID (use lowercase, no spaces)

---

## ➕ Step 2: Adding a New Template

### 2.1 Create the Template Folder
```bash
# Navigate to templates folder
cd resume-pdf-service/templates

# Create your new template folder (use lowercase, hyphens instead of spaces)
mkdir my-awesome-template
```

### 2.2 Create the EJS Template File
Create `my-awesome-template/template.ejs`:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Resume - <%= personalDetails.firstName %> <%= personalDetails.lastName %></title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Header Section -->
    <header class="resume-header">
        <h1><%= personalDetails.firstName %> <%= personalDetails.lastName %></h1>
        <p><%= personalDetails.email %> • <%= personalDetails.phone %></p>
    </header>

    <!-- Education Section -->
    <section class="education">
        <h2>Education</h2>
        <% education.forEach(function(edu) { %>
            <div class="education-item">
                <h3><%= edu.degree %></h3>
                <p><%= edu.institution %></p>
                <p><%= edu.startDate %> - <%= edu.endDate %></p>
            </div>
        <% }); %>
    </section>

    <!-- Skills Section -->
    <section class="skills">
        <h2>Skills</h2>
        <p><%= skills.join(', ') %></p>
    </section>
</body>
</html>
```

### 2.3 Create the CSS File
Create `my-awesome-template/styles.css`:

```css
/* Reset for PDF */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    font-size: 12px;
    line-height: 1.4;
    color: #333;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

/* Header Styles */
.resume-header {
    text-align: center;
    border-bottom: 2px solid #333;
    padding-bottom: 20px;
    margin-bottom: 30px;
}

.resume-header h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

/* Section Styles */
section {
    margin-bottom: 25px;
}

section h2 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    text-transform: uppercase;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
}

.education-item {
    margin-bottom: 15px;
}

.education-item h3 {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
}

/* Print-specific styles */
@media print {
    body {
        padding: 0;
    }
    
    section {
        page-break-inside: avoid;
    }
}
```

### 2.4 Important EJS Syntax to Know
```ejs
<!-- Display a variable -->
<%= variableName %>

<!-- Loop through an array -->
<% arrayName.forEach(function(item) { %>
    <%= item.property %>
<% }); %>

<!-- Check if a variable exists -->
<% if (variableName) { %>
    <%= variableName %>
<% } %>

<!-- Display nested object properties -->
<%= personalDetails.firstName %>
<%= education[0].institution %>
```

---

## ✏️ Step 3: Modifying Existing Templates

### 3.1 Find the Template
```bash
cd resume-pdf-service/templates
ls  # See all available templates
```

### 3.2 Make Your Changes
- Edit `template.ejs` to change the HTML structure
- Edit `styles.css` to change the appearance
- **Important**: Test changes after modifications (see Step 4)

### 3.3 Common Modifications
- Add new sections (projects, certifications, etc.)
- Change colors and fonts
- Adjust layout and spacing
- Add conditional logic for optional sections

---

## 🚀 Step 4: Start the Backend Server

### 4.1 Install Dependencies (First Time Only)
```bash
cd resume-pdf-service
npm install
```

### 4.2 Start the Server
```bash
npm start
```
You should see:
```
Server listening on http://localhost:3001
Templates loaded: [modern, creative, my-awesome-template]
```

---

## 🧪 Step 5: Test Templates Using Postman

### 5.1 Install Postman (if not installed)
Download from: https://www.postman.com/downloads/

### 5.2 Test 1: List All Templates
**Request Setup:**
- **Method**: `GET`
- **URL**: `http://localhost:3001/templates`
- **Headers**: None needed

**Expected Response:**
```json
{
  "templates": [
    {
      "id": "modern",
      "name": "Modern",
      "description": "Clean and professional template"
    },
    {
      "id": "creative",
      "name": "Creative",
      "description": "Modern design with creative elements"
    },
    {
      "id": "my-awesome-template",
      "name": "My Awesome Template",
      "description": "Your custom template"
    }
  ]
}
```

**✅ Success Check**: Your template should appear in the list!

### 5.3 Test 2: Generate PDF with Your Template
**Request Setup:**
- **Method**: `POST`
- **URL**: `http://localhost:3001/generate-pdf/my-awesome-template`
- **Headers**: 
  - `Content-Type: application/json`

**Request Body (raw JSON):**
```json
{
  "personalDetails": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, State 12345",
    "summary": "Experienced software developer passionate about creating amazing user experiences."
  },
  "education": [
    {
      "institution": "Example University",
      "degree": "B.Sc. Computer Science",
      "startDate": "2018-09-01",
      "endDate": "2022-06-30",
      "gpa": "3.8"
    }
  ],
  "experience": [
    {
      "company": "Tech Company",
      "position": "Software Developer",
      "startDate": "2022-07-01",
      "endDate": "Present",
      "description": "Developed web applications using React and Node.js"
    }
  ],
  "skills": ["JavaScript", "React", "Node.js", "Python", "SQL"],
  "projects": [
    {
      "name": "E-commerce Platform",
      "description": "Built a full-stack e-commerce solution",
      "technologies": ["React", "Node.js", "MongoDB"]
    }
  ]
}
```

**Expected Response:**
- **Status**: `200 OK`
- **Body**: Binary PDF data (Postman will show "Download" button)
- **Action**: Click "Save Response" → "Save to a file" → Name it `test-resume.pdf`

**✅ Success Check**: Open the PDF file - it should show your formatted resume!

---

## 🐛 Step 6: Debugging Common Issues

### Issue 1: PDF is Blank or Empty
**Causes:**
- EJS syntax errors in template
- Missing required fields in JSON data
- CSS issues preventing content display

**Solutions:**
```bash
# Check backend terminal for error messages
# Look for EJS compilation errors
```

**Test with minimal data:**
```json
{
  "personalDetails": {
    "firstName": "Test",
    "lastName": "User"
  }
}
```

### Issue 2: Template Not Listed in /templates
**Causes:**
- Folder name has spaces or special characters
- Missing template.ejs file
- Server not restarted after adding template

**Solutions:**
```bash
# Use lowercase and hyphens only
my-awesome-template  ✅
My Awesome Template ❌
my_awesome_template ❌

# Restart server after adding templates
npm start
```

### Issue 3: Styling Problems in PDF
**Causes:**
- CSS not optimized for print
- External resources (fonts, images) not accessible
- CSS syntax errors

**Solutions:**
```css
/* Use print-friendly CSS */
@media print {
    /* Hide unnecessary elements */
    .no-print { display: none; }
    
    /* Ensure content fits on page */
    body { margin: 0.5in; }
    
    /* Avoid page breaks inside sections */
    section { page-break-inside: avoid; }
}
```

### Issue 4: EJS Template Errors
**Common EJS Mistakes:**
```ejs
<!-- ❌ Wrong: Missing closing tag -->
<%= personalDetails.firstName

<!-- ❌ Wrong: Undefined variable -->
<%= undefinedVariable %>

<!-- ✅ Correct: Proper syntax -->
<%= personalDetails.firstName %>

<!-- ✅ Correct: Check if exists -->
<% if (personalDetails && personalDetails.firstName) { %>
    <%= personalDetails.firstName %>
<% } %>
```

---

## 🎨 Step 7: Add Template to Frontend UI

### 7.1 Template Preview Image (Optional but Recommended)
Create a preview image: `public/template-previews/my-awesome-template.png`
- Recommended size: 400x500 pixels
- Shows a thumbnail of your template design

### 7.2 Update Frontend Template List
The frontend automatically fetches templates from `/templates` endpoint, so your template should appear automatically!

### 7.3 Test Full UI Flow
1. Start the frontend: `npm start` (in the UI folder)
2. Navigate to template selection page
3. Your template should appear with others
4. Select it and complete the resume flow
5. Test PDF generation from the UI

---

## 📝 Step 8: Best Practices & Tips

### Template Development Tips
1. **Start Simple**: Begin with basic structure, then add complexity
2. **Test Often**: Test with Postman after each major change
3. **Use Print CSS**: Always include `@media print` styles
4. **Handle Missing Data**: Use conditional EJS to handle empty fields
5. **Keep it Clean**: Use semantic HTML5 elements

### EJS Template Best Practices
```ejs
<!-- ✅ Good: Handle missing data gracefully -->
<% if (personalDetails && personalDetails.firstName) { %>
    <h1><%= personalDetails.firstName %> <%= personalDetails.lastName %></h1>
<% } else { %>
    <h1>Your Name</h1>
<% } %>

<!-- ✅ Good: Loop with safety checks -->
<% if (education && education.length > 0) { %>
    <% education.forEach(function(edu) { %>
        <div class="education-item">
            <h3><%= edu.degree || 'Degree' %></h3>
            <p><%= edu.institution || 'Institution' %></p>
        </div>
    <% }); %>
<% } %>
```

### CSS Best Practices
```css
/* ✅ Good: Print-optimized styles */
body {
    font-size: 12px; /* Smaller for print */
    line-height: 1.2; /* Tighter spacing */
    color: #000; /* Black text for print */
}

/* ✅ Good: Avoid background colors in print */
@media print {
    body {
        background: white !important;
        color: black !important;
    }
    
    /* Remove unnecessary elements */
    nav, footer, .no-print {
        display: none !important;
    }
}
```

---

## 🔄 Complete Workflow Summary

1. **Create Template Folder**: `templates/my-template/`
2. **Add Files**: `template.ejs` + `styles.css`
3. **Start Backend**: `npm start` in `resume-pdf-service`
4. **Test in Postman**: 
   - GET `/templates` → Verify template appears
   - POST `/generate-pdf/my-template` → Test PDF generation
5. **Debug Issues**: Check console, use minimal data, verify EJS syntax
6. **Test UI**: Verify template appears in frontend selection
7. **End-to-End Test**: Complete full resume creation flow

---

## 🆘 Need Help?

### Common Resources
- **EJS Documentation**: https://ejs.co/
- **CSS for Print**: https://www.smashingmagazine.com/2015/01/designing-for-print-with-css/
- **Postman Documentation**: https://learning.postman.com/

### Quick Test Commands
```bash
# Check if server is running
curl http://localhost:3001/templates

# Test PDF generation (requires JSON file)
curl -X POST http://localhost:3001/generate-pdf/my-template \
  -H "Content-Type: application/json" \
  -d @test-data.json \
  --output test.pdf
```

### Template Data Structure Reference
All available data fields for your EJS template:
```json
{
  "personalDetails": {
    "firstName": "", "lastName": "", "email": "", "phone": "", 
    "address": "", "summary": ""
  },
  "education": [
    { "institution": "", "degree": "", "startDate": "", "endDate": "", "gpa": "" }
  ],
  "experience": [
    { "company": "", "position": "", "startDate": "", "endDate": "", "description": "" }
  ],
  "skills": ["skill1", "skill2"],
  "projects": [
    { "name": "", "description": "", "technologies": [] }
  ]
}
```

---

**🎉 Congratulations!** You now know how to add, modify, and test resume templates. Happy coding!
