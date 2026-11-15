
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const COLORS = {
  dark: [7, 9, 14],
  purple: [124, 58, 237],
  cyan: [6, 182, 212],
  white: [255, 255, 255],
  text: [40, 45, 55],
  muted: [110, 115, 125],
  light: [245, 246, 250],
  gold: [190, 145, 65],
};

export function generateDirectorDeck(project, storyboardImages = {}) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const W = 210;
  const H = 297;
  const margin = 16;

  let pageNumber = 0;
  let cursorY = 20;

  const safe = (value, fallback = 'Not specified') =>
    value === undefined || value === null || value === ''
      ? fallback
      : String(value);

  const addPageNumber = () => {
  pageNumber += 1;
};

  const addText = (value, options = {}) => {
    const {
      size = 10,
      color = COLORS.text,
      bold = false,
      gap = 4,
      width = W - margin * 2,
    } = options;

    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    doc.setTextColor(...color);

    const lines = doc.splitTextToSize(safe(value), width);

    if (cursorY  + lines.length * (size * 0.45) > 275) {
      doc.addPage();
      addPageNumber();
      cursorY = 20;
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.setFontSize(size);
      doc.setTextColor(...color);
    }

    doc.text(lines, margin, cursorY );
    cursorY =cursorY  + lines.length * (size * 0.45) + gap;
  };
  

const addStoryboardImage = (imageData) => {
  if (!imageData) return;

  const imageWidth = W - margin * 2;
  const imageHeight = imageWidth * (9 / 16);

  if (cursorY + imageHeight > 275) {
    doc.addPage();
    addPageNumber();
    cursorY = 20;
  }

  const imageFormat = imageData.startsWith('data:image/png')
    ? 'PNG'
    : 'JPEG';

  doc.addImage(
    imageData,
    imageFormat,
    margin,
    cursorY,
    imageWidth,
    imageHeight
  );

  cursorY += imageHeight + 8;
};


  const heading = (title) => {
    if (cursorY  > 255) {
      doc.addPage();
      addPageNumber();
      cursorY = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.setTextColor(...COLORS.purple);
    doc.text(title, margin, cursorY  + 5);
    cursorY =cursorY  + 13;

    doc.setDrawColor(...COLORS.cyan);
    doc.setLineWidth(0.6);
    doc.line(margin, cursorY , W - margin, cursorY );
    cursorY =cursorY  + 7;
  };

  const section = (number, title, subtitle) => {
    doc.addPage();
    addPageNumber();

    doc.setFillColor(...COLORS.dark);
    doc.rect(0, 0, W, H, 'F');

    doc.setTextColor(...COLORS.cyan);
    doc.setFontSize(14);
    doc.text(`SECTION ${number}`, margin, 125);

    doc.setTextColor(...COLORS.white);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(25);
    doc.text(title, margin, 145);

    doc.setTextColor(190, 195, 210);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(doc.splitTextToSize(subtitle, 165), margin, 158);

    doc.setDrawColor(...COLORS.purple);
    doc.setLineWidth(1.2);
    doc.line(margin, 170, 85, 170);

    doc.addPage();
addPageNumber();
cursorY = 20;
  };

  const table = (headers, rows, widths) => {
    if (cursorY  > 240) {
      doc.addPage();
      addPageNumber();
      cursorY =20;
    }

    autoTable(doc, {
      startY: cursorY ,
      head: [headers],
      body: rows.length ? rows : [['No information available']],
      margin: { left: margin, right: margin, bottom: 20 },
      theme: 'grid',
      styles: {
        font: 'helvetica',
        fontSize: 8,
        cellPadding: 3,
        overflow: 'linebreak',
        textColor: COLORS.text,
        lineColor: [220, 222, 230],
      },
      headStyles: {
        fillColor: COLORS.dark,
        textColor: COLORS.white,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: COLORS.light,
      },
      columnStyles: widths || {},
      didDrawPage: () => {
        // Footer is added after all document pages are created.
      },
    });

    cursorY =doc.lastAutoTable.finalY + 9;
  };

  // 1. CINEMATIC COVER

  doc.setFillColor(...COLORS.dark);
  doc.rect(0, 0, W, H, 'F');

  doc.setFillColor(...COLORS.purple);
  doc.circle(180, 40, 42, 'F');

  doc.setFillColor(...COLORS.cyan);
  doc.circle(195, 260, 35, 'F');

  doc.setTextColor(...COLORS.white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('FRAMEFORGE AI', margin, 40);

  doc.setTextColor(...COLORS.cyan);
  doc.setFontSize(9);
  doc.text('GENERATIVE FILM PRE-PRODUCTION', margin, 48);

  doc.setDrawColor(...COLORS.purple);
  doc.setLineWidth(1);
  doc.line(margin, 85, 80, 85);

  doc.setTextColor(...COLORS.white);
  doc.setFontSize(29);
  const titleLines = doc.splitTextToSize(
    safe(project.title, 'Untitled Film'),
    165
  );
  doc.text(titleLines, margin, 112);

  doc.setTextColor(190, 195, 210);
  doc.setFontSize(12);
  doc.text('COMPREHENSIVE DIRECTOR’S DECK', margin, 145);

  doc.setTextColor(...COLORS.cyan);
  doc.setFontSize(10);
  doc.text(`GENRE: ${safe(project.genre)}`, margin, 190);
  doc.text(`VISUAL STYLE: ${safe(project.style)}`, margin, 200);
  doc.text(`NARRATIVE PACE: ${safe(project.pace)}`, margin, 210);

  doc.setTextColor(...COLORS.white);
  doc.setFontSize(9);
  doc.text('FROM IMAGINATION TO CINEMATIC BLUEPRINT', margin, 270);

  // 2. STORY DEVELOPMENT

  section(1, 'STORY DEVELOPMENT', 'The foundation of the cinematic narrative.');

  heading('Project Overview');
  addText(`Film Title: ${safe(project.title)}`, { bold: true });
  addText(`Genre: ${safe(project.genre)}`);
  addText(`Visual Aesthetic: ${safe(project.style)}`);
  addText(`Narrative Pace: ${safe(project.pace)}`);

  heading('Story Logline');
  addText(project.logline, { size: 12 });

  heading('Story Synopsis');
  addText(
    project.synopsis,
    { gap: 6 }
  );

  heading('Narrative Themes & Creative Intent');
  addText(project.themes);
  addText(project.creativeIntent);

  // 3. SCREENPLAY AND SCENE BREAKDOWN

  section(2, 'SCREENPLAY & SCENES', 'Scene-by-scene narrative and screenplay breakdown.');

  (project.scenes || []).forEach((scene) => {
    heading(`SCENE ${scene.id}: ${safe(scene.slug)}`);
    addText(`Summary: ${safe(scene.summary)}`);
    addText(`Mood: ${safe(scene.mood)}`);

    (scene.script || []).forEach((line) => {
      addText(`${safe(line.type).toUpperCase()}: ${safe(line.text)}`, {
        size: 9,
      });
    });
  });

  // 4. CINEMATOGRAPHY

  section(3, 'CINEMATOGRAPHY PLAN', 'Camera language, framing, lighting and sound design.');

  table(
    ['SHOT ID', 'SCENE', 'SHOT TYPE', 'LENS', 'MOVEMENT'],
    (project.shots || []).map((shot) => [
      safe(shot.id),
      safe(shot.scene),
      safe(shot.type),
      safe(shot.lens),
      safe(shot.movement),
    ])
  );

  heading('Lighting & Sound Design');

  (project.shots || []).forEach((shot) => {
    addText(`${safe(shot.id)} – Lighting: ${safe(shot.lighting)}`);
    addText(`Audio: ${safe(shot.audio)}`);
    addText(`Visual Description: ${safe(shot.description)}`);
  });

  // 5. STORYBOARD

  section(4, 'VISUAL STORYBOARD', 'Visual references and image-generation instructions.');

  (project.storyboard || []).forEach((frame) => {
      // Keep each storyboard frame together on the same page
  const estimatedFrameHeight = 170;

  if (cursorY + estimatedFrameHeight > 275) {
    doc.addPage();
    addPageNumber();
    cursorY = 20;
  }
    heading(`${safe(frame.id)} – ${safe(frame.title)}`);
    addText(`Related Shot: ${safe(frame.shotId)}`);
    addText(`Camera: ${safe(frame.camera)}`);
    addText(`Visual Style: ${safe(frame.visualStyle)}`);
    addText(`Image Generation Prompt: ${safe(frame.prompt)}`);
    addStoryboardImage(storyboardImages[frame.id]);
  });

  // 6. CHARACTER BIBLE

  section(5, 'CHARACTER & LORE BIBLE', 'Character identities, motivations and visual continuity.');

  (project.characters || []).forEach((character) => {
    heading(character.name);
    addText(`Role: ${safe(character.role)}`);
    addText(`Age: ${safe(character.age)}`);
    addText(`Archetype: ${safe(character.archetype)}`);
    addText(`Appearance & Costume: ${safe(character.traits)}`);
    addText(`Character Arc: ${safe(character.arc)}`);
  });

  // 7. CONTINUITY

  section(6, 'CONTINUITY & CONSISTENCY', 'Production reference checks for visual and narrative consistency.');

  heading('Character Continuity');
  addText(project.characterContinuity);

  heading('Scene Continuity');
  addText(project.sceneContinuity);

  heading('Props & Costume Continuity');
  addText(project.propsContinuity);

  // 8. PRODUCTION PLANNING

  section(7, 'PRODUCTION PLANNING', 'Practical requirements for production preparation.');

  heading('Location Requirements');
  addText(project.locations);

  heading('Props & Equipment');
  addText(project.props);

  heading('Costume Requirements');
  addText(project.costumes);

  heading('Production Schedule');
  addText(project.schedule);

  heading('Budget Planning');
  addText(project.budget);

  // 9. DIRECTOR'S VISION

  section(8, 'DIRECTOR’S VISION', 'Creative direction and storytelling decisions.');

  heading('Directorial Notes');
  addText(project.directorNotes);

  heading('Visual & Emotional Direction');
  addText(project.visualDirection);

  heading('Sound & Music Direction');
  addText(project.soundDirection);

  // 10. CHECKLIST

  section(9, 'PRODUCTION CHECKLIST', 'Items to review before production begins.');

  table(
    ['TASK', 'STATUS'],
    [
      ['Screenplay review', 'Pending review'],
      ['Scene breakdown approval', 'Pending review'],
      ['Shot list approval', 'Pending review'],
      ['Storyboard approval', 'Pending review'],
      ['Character design approval', 'Pending review'],
      ['Location confirmation', 'Pending review'],
      ['Props and costumes', 'Pending review'],
      ['Production schedule', 'Pending review'],
      ['Budget approval', 'Pending review'],
    ]
  );

  // 11. APPENDIX

  section(10, 'APPENDIX & REFERENCES', 'Supporting creative information.');

  heading('Project Configuration');
  addText(`Film: ${safe(project.title)}`);
  addText(`Genre: ${safe(project.genre)}`);
  addText(`Style: ${safe(project.style)}`);
  addText(`Pace: ${safe(project.pace)}`);

  heading('Export Information');
  addText('Generated by FrameForge AI.');
  addText('Unprovided production information is identified as not specified.');
  addText('All creative and production details should be reviewed before filming.');

  // CONSISTENT INTERIOR HEADERS AND FOOTERS

  const totalPages = doc.getNumberOfPages();

  for (let i = 2; i <= totalPages; i++) {
    doc.setPage(i);

    doc.setFillColor(...COLORS.white);
    doc.setTextColor(...COLORS.muted);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text('FRAMEFORGE AI  /  PRODUCTION DOCUMENT', margin, 10);

    doc.setDrawColor(225, 225, 235);
    doc.line(margin, 13, W - margin, 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`PAGE ${i - 1} OF ${totalPages - 1}`, W - margin, 287, {
      align: 'right',
    });
  }

  doc.save('FrameForge_Comprehensive_Directors_Deck.pdf');
}
