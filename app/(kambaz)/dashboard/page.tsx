import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
return (
    <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
        <div id="wd-dashboard-courses">
            <div className="wd-dashboard-course">
                <Link href="/courses/1234" className="wd-dashboard-course-link">
                    <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
                    <div>
                        <h5> CS1234 React JS </h5>
                        <p className="wd-dashboard-course-title">
                            Full Stack software developer
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            <div className="wd-dashboard-course">
                <Link href="/courses/3800" className="wd-dashboard-course-link">
                    <Image src="/images/TheoryOfComp.jpg" width={200} height={150} alt="TheoryOfComp" />
                    <div>
                        <h5> CS3800 Theory of Computation </h5>
                        <p className="wd-dashboard-course-title">
                            Learn the fundamentals of computation
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            <div className="wd-dashboard-course">
                <Link href="/courses/4100" className="wd-dashboard-course-link">
                    <Image src="/images/AI.jpg" width={200} height={150} alt="AI" />
                    <div>
                        <h5> CS4100 Artificial Intelligence </h5>
                        <p className="wd-dashboard-course-title">
                            Learn the fundamentals of artificial intelligence
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            <div className="wd-dashboard-course">
                <Link href="/courses/4120" className="wd-dashboard-course-link">
                    <Image src="/images/NLP.jpg" width={200} height={150} alt="NLP" />
                    <div>
                        <h5> CS4120 Natural Language Processing </h5>
                        <p className="wd-dashboard-course-title">
                            Learn the fundamentals of natural language processing
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            <div className="wd-dashboard-course">
                <Link href="/courses/3650" className="wd-dashboard-course-link">
                    <Image src="/images/Systems.jpg" width={200} height={150} alt="ComputerSystems" />
                    <div>
                        <h5> CS3650 Computer Systems </h5>
                        <p className="wd-dashboard-course-title">
                            Learn the fundamentals of computer systems
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            <div className="wd-dashboard-course">
                <Link href="/courses/4180" className="wd-dashboard-course-link">
                    <Image src="/images/Reinforcement.jpg" width={200} height={150} alt="Reinforcement Learning" />
                    <div>
                        <h5> CS4180 Reinforcement Learning </h5>
                        <p className="wd-dashboard-course-title">
                            Learn the fundamentals of reinforcement learning
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            <div className="wd-dashboard-course">
                <Link href="/courses/4300" className="wd-dashboard-course-link">
                    <Image src="/images/ComputerGraphics.jpg" width={200} height={150} alt="Computer Graphics" />
                    <div>
                        <h5> CS4300 Computer Graphics </h5>
                        <p className="wd-dashboard-course-title">
                            Learn the fundamentals of computer graphics
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
        </div>
    </div>
);}
