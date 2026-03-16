/**
 * About section content - framework-agnostic
 */
export function getAboutText(): string {
  const years = new Date().getFullYear() - 2020 + 1
  return `Hi, I'm Parag Saxena, a Full Stack Developer with around ${years} years of experience building clean, scalable, and user-focused web applications. I specialize in Angular, TypeScript, Node.js, GraphQL, and MongoDB, and I enjoy turning complex ideas into simple, usable, and reliable digital experiences.<br><br>Over the years, I've worked across the stack-leading UI modules, improving application performance, and building features that are both intuitive and efficient. I care about clean code, thoughtful architecture, and creating systems that teams can maintain and scale with confidence.<br>I'm comfortable working end-to-end: designing smooth front-end experiences, building solid backend APIs, improving performance, mentoring developers, and collaborating closely with teams. I'm also a big believer in using AI-assisted development tools to write smarter code, boost productivity, and explore better solutions.<br><br>At my core, I'm someone who enjoys learning, experimenting, and improving a little every day. Whether it's building new features, solving performance bottlenecks, or exploring emerging tech, I love the process of creating things that work well and make a real difference.`
}
