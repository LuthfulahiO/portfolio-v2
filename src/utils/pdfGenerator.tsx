import React from 'react';
import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';

// Define styles for PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    paddingBottom: 3,
  },
  paragraph: {
    fontSize: 10,
    marginBottom: 8,
    lineHeight: 1.5,
  },
  listItem: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.5,
    marginLeft: 10,
    flexDirection: 'row',
  },
  listItemBullet: {
    width: 10,
    fontSize: 10,
  },
  listItemContent: {
    flex: 1,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  jobLocation: {
    fontSize: 10,
    fontWeight: 'normal',
  },
  jobTitle: {
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 3,
  },
  jobDuration: {
    fontSize: 10,
    fontWeight: 'normal',
    marginBottom: 5,
  },
});

// Function to parse markdown content and generate a structured object
function parseMarkdownContent(markdownContent: string) {
  const lines = markdownContent.split('\n');
  
  // Extract sections
  const sections: Record<string, string> = {};
  let currentSection: string | null = null;
  let currentContent: string[] = [];
  
  // First line might be the main title
  let name = lines[0].replace(/^#\s+/, '').trim();
  if (!name || name === '') {
    name = 'Resume';
  }
  
  // Extract contact info (usually comes after the name)
  let contactInfo = '';
  for (let i = 1; i < 7; i++) {
    if (lines[i] && !lines[i].startsWith('#') && lines[i].trim() !== '') {
      contactInfo += lines[i] + ' ';
    }
  }
  
  // Extract sections
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this is a section header (## Section Title)
    if (line.startsWith('## ')) {
      if (currentSection) {
        sections[currentSection] = currentContent.join('\n');
      }
      
      currentSection = line.replace(/^##\s+/, '');
      currentContent = [];
    } 
    // Check if it's a subsection (### Subsection)
    else if (line.startsWith('### ')) {
      currentContent.push(line);
    }
    // Regular content
    else if (currentSection) {
      currentContent.push(line);
    }
  }
  
  // Add the last section
  if (currentSection) {
    sections[currentSection] = currentContent.join('\n');
  }
  
  return {
    name,
    contactInfo,
    sections,
  };
}

// Function to render a section with proper formatting
const renderSection = (title: string, content: string) => {
  const lines = content.split('\n');
  
  return (
    <View style={styles.section} key={title}>
      <Text style={styles.sectionTitle}>{title}</Text>
      
      {lines.map((line, index) => {
        // Skip empty lines
        if (line.trim() === '') return null;
        
        // Handle subsections (### Title)
        if (line.startsWith('### ')) {
          const subsectionTitle = line.replace(/^###\s+/, '');
          
          // Special case for experience entries which often have location and dates
          if (title === 'Experience' || title === 'Professional Experience' || title === 'Work Experience') {
            const location = lines[index + 1]?.trim() || '';
            const duration = lines[index + 2]?.trim() || '';
            
            return (
              <View key={`subsection-${index}`} style={{ marginBottom: 10 }}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.companyName}>{subsectionTitle}</Text>
                </View>
                {location && <Text style={styles.jobLocation}>{location}</Text>}
                {duration && <Text style={styles.jobDuration}>{duration}</Text>}
              </View>
            );
          }
          
          return <Text style={styles.companyName} key={`subsection-${index}`}>{subsectionTitle}</Text>;
        }
        
        // Handle bullet points
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
          const bulletContent = line.trim().substring(2);
          return (
            <View style={styles.listItem} key={`list-${index}`}>
              <Text style={styles.listItemBullet}>• </Text>
              <Text style={styles.listItemContent}>{bulletContent}</Text>
            </View>
          );
        }
        
        // Handle bold text (**text**)
        if (line.includes('**')) {
          const parts = line.split('**');
          return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 5 }} key={`formatted-${index}`}>
              {parts.map((part, i) => {
                // Even indices are regular text, odd indices are bold
                return (
                  <Text key={`part-${i}`} style={{ 
                    fontSize: 10, 
                    fontWeight: i % 2 === 0 ? 'normal' : 'bold'
                  }}>
                    {part}
                  </Text>
                );
              })}
            </View>
          );
        }
        
        // Regular text
        return <Text style={styles.paragraph} key={`text-${index}`}>{line}</Text>;
      })}
    </View>
  );
};

// Main function to create PDF from markdown
export function createPdfFromMarkdown(markdownContent: string) {
  const { name, contactInfo, sections } = parseMarkdownContent(markdownContent);
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{name}</Text>
        {contactInfo && <Text style={styles.contactInfo}>{contactInfo}</Text>}
        
        {/* Render each section */}
        {Object.entries(sections).map(([title, content]) => 
          renderSection(title, content)
        )}
      </Page>
    </Document>
  );
}
