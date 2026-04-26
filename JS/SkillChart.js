const canvas = document.getElementById('radarChart');
const draw = canvas.getContext('2d');
 
const skills = [
    { label: 'Unity / C#',   grade: 'B' },
    { label: 'Godot',        grade: 'B' },
    { label: 'HTML/CSS',     grade: 'C' },
    { label: 'SQL',          grade: 'C' },
    { label: 'PHP',          grade: 'D' },
    { label: 'JavaScript',   grade: 'C' },
    { label: 'MonoGame',     grade: 'C' },
    { label: 'C++',          grade: 'D' },
    { label: 'TypeScript',   grade: 'D' },
    { label: 'Python',       grade: 'E' },
    { label: 'Java',         grade: 'E' },
    { label: '2D Art',       grade: 'C' },
    { label: '3D Art',       grade: 'D' },
    { label: 'Music',        grade: 'C' },
    { label: 'Multiplayer',  grade: 'C' },
    { label: 'GIT',          grade: 'C' }
];
 

const grade_map = { A: 5, B: 4, C: 3, D: 2, E: 1 };
const grade_labels = ['E', 'D', 'C', 'B', 'A'];
const max_level = 5;
 
const cx = canvas.width / 2;
const cy = canvas.height / 2;
const max_r = 170;
const n = skills.length;
 
function angle_for(i) 
{
    return (Math.PI * 2 * i) / n - Math.PI / 2;
}
 
function point_on_axis(i, level) 
{
    const r = (level / max_level) * max_r;
    const a = angle_for(i);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}
 
function draw_chart() 
{
    draw.clearRect(0, 0, canvas.width, canvas.height);
    
    const bg_grad= draw.createRadialGradient(cx, cy, 0, cx, cy, max_r + 30);
    bg_grad.addColorStop(0, 'rgba(40, 44, 52, 0.95)');
    bg_grad.addColorStop(1, 'rgba(30, 50, 60, 0.85)');

    draw.beginPath();
    draw.arc(cx, cy, max_r + 30, 0, Math.PI * 2);
    draw.fillStyle = bg_grad;
    draw.fill();

    draw.beginPath();
    draw.arc(cx, cy, max_r + 30, 0, Math.PI * 2);
    draw.strokeStyle = '#61dafb';
    draw.lineWidth = 2;
    draw.stroke();

    for (let i = 0; i < n; i++) 
    {
        const pt = point_on_axis(i, max_level);

        draw.beginPath();
        draw.moveTo(cx, cy);
        draw.lineTo(pt.x, pt.y);
        draw.strokeStyle = 'rgba(97,218,251,0.25)';
        draw.lineWidth = 1;
        draw.stroke();
    }

    draw.beginPath();

    for (let i = 0; i < n; i++) 
    {
        const val = grade_map[skills[i].grade];
        const pt = point_on_axis(i, val);

        i === 0 ? draw.moveTo(pt.x, pt.y) : draw.lineTo(pt.x, pt.y);
    }

    draw.closePath();
    draw.fillStyle = 'rgba(220, 30, 30, 0.55)';
    draw.fill();

    draw.strokeStyle = 'rgba(255, 60, 60, 0.95)';
    draw.lineWidth = 2;
    draw.stroke();

    for (let i = 0; i < n; i++) 
    {
        const val = grade_map[skills[i].grade];
        const pt = point_on_axis(i, val);

        draw.beginPath();
        draw.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        draw.fillStyle = '#ff4444';
        draw.fill();

        draw.strokeStyle = '#ffffff';
        draw.lineWidth = 1.5;
        draw.stroke();
    }

    for (let lvl = 1; lvl <= max_level; lvl++) 
    {
        const r = (lvl / max_level) * max_r;
        draw.beginPath();
        draw.arc(cx, cy, r, 0, Math.PI * 2);
        draw.strokeStyle = lvl === max_level ? 'rgba(97,218,251,0.6)' : 'rgba(97,218,251,0.18)';
        draw.lineWidth = lvl === max_level ? 1.5 : 1;
        draw.setLineDash(lvl < max_level ? [4, 4] : []);
        draw.stroke();
        draw.setLineDash([]);

        const labelR = r;
        draw.fillStyle = 'rgba(97,218,251,0.75)';
        draw.font = 'bold 11px "Fjalla One", sans-serif';
        draw.textAlign = 'center';
        draw.textBaseline = 'middle';
        draw.fillText(grade_labels[lvl - 1], cx + 6, cy - labelR + 1);
    }
 
    for (let i = 0; i < n; i++) 
    {
        const angle = angle_for(i);
        const labelR = max_r + 10;
        const lx = cx + labelR * Math.cos(angle);
        const ly = cy + labelR * Math.sin(angle);
 
        const val = grade_map[skills[i].grade];
        const gradePt = point_on_axis(i, val);

        const badgeR = Math.max((val / max_level) * max_r - 14, 14);
        const bx = cx + badgeR * Math.cos(angle);
        const by = cy + badgeR * Math.sin(angle);

        draw.font = 'bold 12px "Fjalla One", sans-serif';
        draw.textAlign = 'center';
        draw.textBaseline = 'middle';
        draw.fillStyle = '#ffffff';
        draw.fillText(skills[i].grade, bx, by);

        draw.font = 'bold 12px "Fjalla One", sans-serif';
        draw.textAlign = Math.cos(angle) > 0.1 ? 'left' : Math.cos(angle) < -0.1 ? 'right' : 'center';
        draw.textBaseline = Math.sin(angle) > 0.1 ? 'top' : Math.sin(angle) < -0.1 ? 'bottom' : 'middle';

        draw.fillStyle = '#ffffff';
        draw.fillText(skills[i].label, lx, ly);
    }
}
 
draw_chart();
