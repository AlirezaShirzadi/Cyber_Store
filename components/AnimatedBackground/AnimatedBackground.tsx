"use client"
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {loadSlim} from "@tsparticles/slim";

const AnimatedBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (init) {
        return (
            <Particles
                id="tsparticles"
                options={{
                    background: {
                        color: "#E1E4F9"
                    },
                    backgroundMode: {
                        enable: true
                    },
                    detectRetina: true,
                    fpsLimit: 60,
                    interactivity: {
                        detectsOn: "canvas",
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push"
                            },
                            onHover: {
                                enable: true,
                                mode: "bubble"
                            },
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 1,
                                size: 40,
                                speed: 3
                            },
                            push: {
                                quantity: 4
                            }
                        }
                    },
                    particles: {
                        rotate: {
                            value: 0,
                            random: false,
                            direction: "clockwise",
                            animation: {
                                enable: false,
                                speed: 5,
                                sync: false
                            }
                        },
                        move: {
                            enable: true,
                            speed: 2
                        },
                        number: {
                            density: {
                                enable: true,
                            },
                            value: 25
                        },
                        opacity: {
                            value: 0.8
                        },
                        shape: {
                            type: "circle",
                            options: {
                                circle: [
                                    {
                                        particles: {
                                            color: {
                                                value: "#7673D5"
                                            },
                                            move: {
                                                direction: "top"
                                            }
                                        }
                                    },
                                    {
                                        particles: {
                                            color: {
                                                value: "#7673D5"
                                            },
                                            move: {
                                                direction: "bottom"
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        size: {
                            value: 16
                        }
                    }
                }}
            />
        );
    }
};

export default AnimatedBackground;
