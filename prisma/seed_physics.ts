import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const subject = 'Physics'
    console.log(`Seeding questions for ${subject}...`)

    await prisma.question.deleteMany({
        where: { subject }
    })
    console.log(`Cleared existing ${subject} questions.`)

    type QDef = {
        text: string
        options: string[]
        correctOption: number
        classLevel: number
        difficulty: number
    }

    const questions: QDef[] = [
        // === GRADE 6 === (Basic Science / Intro to Physics)
        { text: 'Which science studies nature, matter, energy, and forces?', options: ['Biology', 'Physics', 'History', 'Geography'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'What tool is used to measure temperature?', options: ['Ruler', 'Thermometer', 'Scale', 'Clock'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'What is the standard unit of length in the metric system?', options: ['Inch', 'Foot', 'Meter', 'Pound'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'How many centimeters are in one meter?', options: ['10', '100', '1000', '10000'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'What is the standard unit of mass?', options: ['Liter', 'Kilogram', 'Meter', 'Newton'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'Which of the following is an example of a physical phenomenon?', options: ['Wood burning', 'Water freezing into ice', 'Iron rusting', 'Food digesting'], correctOption: 1, classLevel: 6, difficulty: 2 },
        { text: 'What do we call the amount of space an object occupies?', options: ['Mass', 'Length', 'Volume', 'Density'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'What instrument is used to measure time?', options: ['Thermometer', 'Barometer', 'Stopwatch', 'Protractor'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'Which state of matter has a definite shape and volume?', options: ['Solid', 'Liquid', 'Gas', 'Vacuum'], correctOption: 0, classLevel: 6, difficulty: 1 },
        { text: 'If a car travels 100 km in 2 hours, what is its average speed?', options: ['100 km/h', '200 km/h', '50 km/h', '20 km/h'], correctOption: 2, classLevel: 6, difficulty: 2 },
        { text: 'The force that pulls objects toward the Earth is called...', options: ['Friction', 'Magnetism', 'Gravity', 'Electricity'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'Which of these is a luminous (light-emitting) object?', options: ['The Moon', 'A mirror', 'The Sun', 'A book'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'What happens to water when it is heated to 100°C?', options: ['It freezes', 'It boils and turns into steam', 'It turns into plasma', 'It disappears completely'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'What is a compass used for?', options: ['Measuring speed', 'Finding magnetic North', 'Weighing objects', 'Measuring temperature'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'Which material is attracted to a magnet?', options: ['Wood', 'Iron', 'Plastic', 'Glass'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'The continuous movement of water on, above, and below the surface of the Earth is called...', options: ['Water cycle', 'Weathering', 'Erosion', 'Gravity'], correctOption: 0, classLevel: 6, difficulty: 1 },
        { text: 'A magnifying glass uses what type of lens?', options: ['Concave', 'Convex', 'Flat', 'Opaque'], correctOption: 1, classLevel: 6, difficulty: 2 },
        { text: 'How many seconds are in one hour?', options: ['60', '360', '3600', '86400'], correctOption: 2, classLevel: 6, difficulty: 2 },
        { text: 'What phenomena causes a rainbow?', options: ['Reflection only', 'Dispersion of light', 'Magnetism', 'Sound waves'], correctOption: 1, classLevel: 6, difficulty: 2 },
        { text: 'When you rub your hands together, they get warm due to...', options: ['Gravity', 'Electricity', 'Friction', 'Magnetism'], correctOption: 2, classLevel: 6, difficulty: 1 },

        // === GRADE 7 === (Kinematics, Forces, Pressure, Work)
        { text: 'What is the formula for calculating speed?', options: ['Speed = Distance × Time', 'Speed = Distance / Time', 'Speed = Time / Distance', 'Speed = Mass × Acceleration'], correctOption: 1, classLevel: 7, difficulty: 1 },
        { text: 'What is the standard unit for force in the International System of Units (SI)?', options: ['Kilogram', 'Joule', 'Newton', 'Watt'], correctOption: 2, classLevel: 7, difficulty: 1 },
        { text: 'Density is defined as...', options: ['Mass / Volume', 'Volume / Mass', 'Length × Width × Height', 'Force / Area'], correctOption: 0, classLevel: 7, difficulty: 2 },
        { text: 'What opposes the motion of objects sliding past each other?', options: ['Gravity', 'Inertia', 'Friction', 'Thrust'], correctOption: 2, classLevel: 7, difficulty: 1 },
        { text: 'What is the formula for pressure?', options: ['Pressure = Force × Area', 'Pressure = Force / Area', 'Pressure = Area / Force', 'Pressure = Mass × Gravity'], correctOption: 1, classLevel: 7, difficulty: 2 },
        { text: 'What is the SI unit of pressure?', options: ['Newton', 'Joule', 'Pascal', 'Watt'], correctOption: 2, classLevel: 7, difficulty: 1 },
        { text: 'The upward force exerted by a fluid on an immersed object is called...', options: ['Gravitational force', 'Frictional force', 'Archimedes\' force (Buoyancy)', 'Elastic force'], correctOption: 2, classLevel: 7, difficulty: 2 },
        { text: 'According to Archimedes\' Principle, the buoyant force is equal to...', options: ['The volume of the object', 'The mass of the object', 'The weight of the fluid displaced', 'The density of the fluid'], correctOption: 2, classLevel: 7, difficulty: 3 },
        { text: 'A heavy ship floats because its overall density is...', options: ['Greater than water', 'Less than water', 'Equal to water', 'Infinite'], correctOption: 1, classLevel: 7, difficulty: 2 },
        { text: 'Mechanical work is calculated by the formula...', options: ['Work = Force × Distance', 'Work = Force / Distance', 'Work = Mass × Acceleration', 'Work = Power × Time'], correctOption: 0, classLevel: 7, difficulty: 2 },
        { text: 'What is the SI unit of work and energy?', options: ['Newton', 'Joule', 'Watt', 'Pascal'], correctOption: 1, classLevel: 7, difficulty: 1 },
        { text: 'Power is defined as...', options: ['Force × Distance', 'Work / Time', 'Energy × Time', 'Force / Area'], correctOption: 1, classLevel: 7, difficulty: 2 },
        { text: 'What is the SI unit of Power?', options: ['Joule', 'Newton', 'Watt', 'Pascal'], correctOption: 2, classLevel: 7, difficulty: 1 },
        { text: 'A simple machine that consists of a rigid bar pivoted on a fixed point is called a...', options: ['Pulley', 'Inclined plane', 'Lever', 'Screw'], correctOption: 2, classLevel: 7, difficulty: 1 },
        { text: 'The fixed point on which a lever pivots is called the...', options: ['Load', 'Fulcrum', 'Effort', 'Arm'], correctOption: 1, classLevel: 7, difficulty: 1 },
        { text: '"For every action, there is an equal and opposite reaction" is Newton\'s...', options: ['First Law', 'Second Law', 'Third Law', 'Law of Gravitation'], correctOption: 2, classLevel: 7, difficulty: 1 },
        { text: 'Atmospheric pressure is measured using a...', options: ['Thermometer', 'Barometer', 'Dynamometer', 'Hygrometer'], correctOption: 1, classLevel: 7, difficulty: 1 },
        { text: 'What is the acceleration due to gravity (g) on Earth approximately?', options: ['9.8 m/s²', '1.6 m/s²', '3.14 m/s²', '100 m/s²'], correctOption: 0, classLevel: 7, difficulty: 2 },
        { text: 'Kinetic energy depends on an object\'s...', options: ['Height and mass', 'Mass and velocity', 'Volume and density', 'Temperature'], correctOption: 1, classLevel: 7, difficulty: 2 },
        { text: 'Potential energy depends on an object\'s...', options: ['Mass, gravity, and height', 'Mass and velocity', 'Temperature', 'Friction'], correctOption: 0, classLevel: 7, difficulty: 2 },

        // === GRADE 8 === (Thermal, Electrical, Basics of Optics)
        { text: 'Which of the following is an example of heat transfer by conduction?', options: ['Sunlight warming the Earth', 'A metal spoon getting hot in hot tea', 'Warm air rising in a room', 'Microwaving food'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'The heat required to raise the temperature of 1 kg of a substance by 1°C is called...', options: ['Latent heat', 'Specific heat capacity', 'Thermal conductivity', 'Internal energy'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'What happens to the temperature of a substance while it is melting?', options: ['It increases', 'It decreases', 'It remains constant', 'It fluctuates'], correctOption: 2, classLevel: 8, difficulty: 3 },
        { text: 'The process of a liquid turning into a gas continuously throughout its volume is called...', options: ['Evaporation', 'Boiling', 'Condensation', 'Melting'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'Inside a typical internal combustion engine, thermal energy is converted into...', options: ['Electrical energy', 'Mechanical energy', 'Chemical energy', 'Nuclear energy'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'Objects with the same electric charge...', options: ['Attract each other', 'Repel each other', 'Have no effect on each other', 'Destroy each other'], correctOption: 1, classLevel: 8, difficulty: 1 },
        { text: 'What is the SI unit of electric charge?', options: ['Ampere', 'Volt', 'Ohm', 'Coulomb'], correctOption: 3, classLevel: 8, difficulty: 2 },
        { text: 'Electric current is the directed flow of...', options: ['Atoms', 'Molecules', 'Charged particles (like electrons)', 'Neutrons'], correctOption: 2, classLevel: 8, difficulty: 1 },
        { text: 'What is the SI unit of electric current?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], correctOption: 1, classLevel: 8, difficulty: 1 },
        { text: 'According to Ohm\'s Law, Current (I) equals...', options: ['Voltage (U) / Resistance (R)', 'Voltage (U) × Resistance (R)', 'Resistance (R) / Voltage (U)', 'Power / Resistance (R)'], correctOption: 0, classLevel: 8, difficulty: 2 },
        { text: 'What tool is used to measure electric voltage?', options: ['Ammeter', 'Voltmeter', 'Galvanometer', 'Rheostat'], correctOption: 1, classLevel: 8, difficulty: 1 },
        { text: 'In a series circuit, if one bulb burns out, the other bulbs...', options: ['Get brighter', 'Go out (stop working)', 'Stay the same', 'Dim slightly'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'Materials that do not conduct electricity well are called...', options: ['Conductors', 'Semiconductors', 'Superconductors', 'Insulators (Dielectrics)'], correctOption: 3, classLevel: 8, difficulty: 1 },
        { text: 'According to the Law of Reflection, the angle of incidence is...', options: ['Greater than the angle of reflection', 'Less than the angle of reflection', 'Equal to the angle of reflection', 'Equal to 90 degrees'], correctOption: 2, classLevel: 8, difficulty: 1 },
        { text: 'The bending of light as it passes from one medium to another is called...', options: ['Reflection', 'Refraction', 'Diffraction', 'Interference'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'A lens that is thicker in the middle than at the edges is a...', options: ['Concave lens', 'Convex lens', 'Plano-concave lens', 'Cylindrical lens'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'What is the unit of optical power of a lens?', options: ['Watt', 'Lumen', 'Diopter', 'Candela'], correctOption: 2, classLevel: 8, difficulty: 3 },
        { text: 'The magnetic field of a bar magnet is strongest at its...', options: ['Center', 'Edges', 'Poles', 'Equator'], correctOption: 2, classLevel: 8, difficulty: 1 },
        { text: 'Joule-Lenz Law calculates...', options: ['The force between charges', 'The heat produced by an electric current', 'The speed of light', 'The pressure of a gas'], correctOption: 1, classLevel: 8, difficulty: 3 },
        { text: 'What type of mirror is typically used for rear-view mirrors in cars to give a wider field of view?', options: ['Plane mirror', 'Concave mirror', 'Convex mirror', ' parabolic mirror'], correctOption: 2, classLevel: 8, difficulty: 3 },

        // === GRADE 9 === (Kinematics II, Dynamics, Waves, Electromagnetism intro)
        { text: 'Motion with a constant acceleration is defined by an acceleration that...', options: ['Increases constantly', 'Decreases constantly', 'Remains constant in magnitude and direction', 'Is always zero'], correctOption: 2, classLevel: 9, difficulty: 2 },
        { text: 'The area under a velocity-time graph represents...', options: ['Acceleration', 'Displacement (Distance traveled)', 'Force', 'Mass'], correctOption: 1, classLevel: 9, difficulty: 3 },
        { text: 'In uniform circular motion, the acceleration is directed...', options: ['Along the tangent', 'Away from the center', 'Towards the center (Centripetal)', 'Upwards'], correctOption: 2, classLevel: 9, difficulty: 3 },
        { text: 'Newton\'s Second Law is described by the formula...', options: ['F = m / a', 'a = F * m', 'F = m * a', 'm = F * a'], correctOption: 2, classLevel: 9, difficulty: 1 },
        { text: 'Momentum (p) is defined as the product of...', options: ['Mass and Acceleration', 'Force and Time', 'Mass and Velocity', 'Work and Distance'], correctOption: 2, classLevel: 9, difficulty: 2 },
        { text: 'If no external forces act on a system, the total momentum of the system...', options: ['Increases', 'Decreases', 'Remains constant (Conservation Law)', 'Becomes zero'], correctOption: 2, classLevel: 9, difficulty: 2 },
        { text: 'The unit of frequency is the...', options: ['Newton', 'Joule', 'Hertz (Hz)', 'Meter per second'], correctOption: 2, classLevel: 9, difficulty: 1 },
        { text: 'Sound cannot travel through...', options: ['Solid wood', 'Water', 'Air', 'A vacuum'], correctOption: 3, classLevel: 9, difficulty: 1 },
        { text: 'The distance between two consecutive crests of a wave is its...', options: ['Amplitude', 'Frequency', 'Wavelength', 'Period'], correctOption: 2, classLevel: 9, difficulty: 1 },
        { text: 'Which rule is used to find the direction of the magnetic field around a straight current-carrying wire?', options: ['Right-hand grip rule', 'Left-hand rule', 'Lenz\'s rule', 'Ohm\'s rule'], correctOption: 0, classLevel: 9, difficulty: 2 },
        { text: 'What force acts on a moving charge in a magnetic field?', options: ['Coulomb force', 'Lorentz force', 'Ampere force', 'Gravitational force'], correctOption: 1, classLevel: 9, difficulty: 3 },
        { text: 'What phenomenon did Michael Faraday discover in 1831?', options: ['Radioactivity', 'Electromagnetic induction', 'X-rays', 'The electron'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: 'An electric generator converts...', options: ['Electrical energy into mechanical', 'Thermal energy into electrical', 'Mechanical energy into electrical', 'Chemical into electrical'], correctOption: 2, classLevel: 9, difficulty: 2 },
        { text: 'Alpha particles are essentially nuclei of which element?', options: ['Hydrogen', 'Helium', 'Carbon', 'Uranium'], correctOption: 1, classLevel: 9, difficulty: 3 },
        { text: 'Beta particles are high-speed...', options: ['Protons', 'Neutrons', 'Photons', 'Electrons'], correctOption: 3, classLevel: 9, difficulty: 3 },
        { text: 'The time required for half of the atoms of a radioactive isotope to decay is called its...', options: ['Decay constant', 'Half-life', 'Mean lifetime', 'Active time'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: 'Isotopes of an element have the same number of protons but a different number of...', options: ['Electrons', 'Neutrons', 'Nuclei', 'Photons'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: 'Energy of motion is called... ', options: ['Potential energy', 'Rest energy', 'Kinetic energy', 'Thermal energy'], correctOption: 2, classLevel: 9, difficulty: 1 },
        { text: 'Which of the following is an electromagnetic wave?', options: ['Sound wave', 'Ultrasound', 'Water wave', 'Light wave'], correctOption: 3, classLevel: 9, difficulty: 2 },
        { text: 'A transformer operates on the principle of...', options: ['Electrostatic induction', 'Electromagnetic induction', 'Thermoelectric effect', 'Photoelectric effect'], correctOption: 1, classLevel: 9, difficulty: 3 },

        // === GRADE 10 === (Molecular Physics, Thermodynamics, Electrostatics, DC Circuits)
        { text: 'The number of molecules in one mole of a substance is called...', options: ['Planck\'s constant', 'Avogadro\'s number', 'Boltzmann constant', 'Faraday constant'], correctOption: 1, classLevel: 10, difficulty: 2 },
        { text: 'What is the absolute zero of temperature in Celsius?', options: ['0 °C', '-100 °C', '-273.15 °C', '-373.15 °C'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'The ideal gas law equation (Mendeleev-Clapeyron equation) is...', options: ['pV = mRT', 'pV = nRT (or PV = m/M * RT)', 'p/V = RT', 'pV = const'], correctOption: 1, classLevel: 10, difficulty: 2 },
        { text: 'An isothermal process occurs at constant...', options: ['Pressure (p)', 'Volume (V)', 'Temperature (T)', 'Heat (Q)'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'According to Boyle-Mariotte\'s Law, at constant temperature, pressure and volume are...', options: ['Directly proportional', 'Inversely proportional', 'Independent', 'Equal'], correctOption: 1, classLevel: 10, difficulty: 3 },
        { text: 'The First Law of Thermodynamics is essentially the law of conservation of...', options: ['Mass', 'Momentum', 'Energy', 'Charge'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'In an adiabatic process, what is zero?', options: ['Change in temperature', 'Work done', 'Heat exchange (Q=0)', 'Change in internal energy'], correctOption: 2, classLevel: 10, difficulty: 3 },
        { text: 'Coulomb\'s Law calculates the force between two...', options: ['Masses', 'Magnetic poles', 'Point electrical charges', 'Currents'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'The electric field strength (E) is defined as...', options: ['Force per unit charge (F/q)', 'Work per unit charge', 'Charge per unit area', 'Voltage per unit current'], correctOption: 0, classLevel: 10, difficulty: 3 },
        { text: 'What device stores electrical energy (charge)?', options: ['Resistor', 'Capacitor', 'Inductor', 'Diode'], correctOption: 1, classLevel: 10, difficulty: 1 },
        { text: 'The unit of electrical capacitance is...', options: ['Henry', 'Tesla', 'Farad', 'Weber'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'When capacitors are connected in parallel, their total capacitance...', options: ['Decreases', 'Is the reciprocal sum', 'Stays the same', 'Is the sum of individual capacitances'], correctOption: 3, classLevel: 10, difficulty: 3 },
        { text: 'When resistors are connected in series, the total resistance...', options: ['Decreases', 'Is the reciprocal sum', 'Is the sum of individual resistances', 'Stays the same'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'Ohm\'s Law for a complete circuit includes which parameter?', options: ['Only external resistance', 'Electromotive force (EMF) and internal resistance', 'Capacitance', 'Inductance'], correctOption: 1, classLevel: 10, difficulty: 3 },
        { text: 'The work done in moving a unit positive charge between two points is called...', options: ['Current', 'Capacitance', 'Voltage (Potential Difference)', 'Power'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'The maximum theoretical efficiency of a heat engine is given by which cycle?', options: ['Otto cycle', 'Diesel cycle', 'Carnot cycle', 'Rankine cycle'], correctOption: 2, classLevel: 10, difficulty: 3 },
        { text: 'What type of current does a battery supply?', options: ['Alternating Current (AC)', 'Direct Current (DC)', 'Pulsating Current', 'No current'], correctOption: 1, classLevel: 10, difficulty: 1 },
        { text: 'Which state of matter is basically an ionized gas?', options: ['Solid', 'Liquid', 'Bose-Einstein Condensate', 'Plasma'], correctOption: 3, classLevel: 10, difficulty: 2 },
        { text: 'Relative humidity is measured as a percentage using a...', options: ['Thermometer', 'Psychrometer or Hygrometer', 'Barometer', 'Manometer'], correctOption: 1, classLevel: 10, difficulty: 2 },
        { text: 'The internal energy of an ideal gas depends only on its...', options: ['Volume', 'Pressure', 'Temperature', 'Density'], correctOption: 2, classLevel: 10, difficulty: 3 },

        // === GRADE 11 === (Electromagnetism, AC, Wave Optics)
        { text: 'The magnetic force on a current-carrying wire is called...', options: ['Lorentz force', 'Ampere force', 'Coulomb force', 'Newton force'], correctOption: 1, classLevel: 11, difficulty: 2 },
        { text: 'The direction of the induced current opposes the change that produced it. This is known as...', options: ['Faraday\'s Law', 'Ampere\'s Law', 'Lenz\'s Law', 'Ohm\'s Law'], correctOption: 2, classLevel: 11, difficulty: 3 },
        { text: 'What describes the capability of a coil to induce EMF in itself when the current changes?', options: ['Capacitance', 'Resistance', 'Inductance', 'Conductance'], correctOption: 2, classLevel: 11, difficulty: 3 },
        { text: 'The standard unit of Inductance is...', options: ['Farad', 'Henry', 'Weber', 'Tesla'], correctOption: 1, classLevel: 11, difficulty: 3 },
        { text: 'An LC circuit (inductor and capacitor) is used as an...', options: ['Oscillatory circuit', 'Amplifier', 'Rectifier', 'Battery'], correctOption: 0, classLevel: 11, difficulty: 3 },
        { text: 'Standard AC frequency in most power grids in CIS/Europe is...', options: ['50 Hz', '60 Hz', '100 Hz', '120 Hz'], correctOption: 0, classLevel: 11, difficulty: 2 },
        { text: 'A transformer can only step up or step down...', options: ['Direct Current (DC)', 'Alternating Current (AC)', 'Both AC and DC', 'Static electricity'], correctOption: 1, classLevel: 11, difficulty: 2 },
        { text: 'In an electromagnetic wave, the electric and magnetic fields are...', options: ['Parallel to each other', 'Perpendicular to each other and the direction of propagation', 'Randomly oriented', 'Zero'], correctOption: 1, classLevel: 11, difficulty: 3 },
        { text: 'The speed of electromagnetic waves in a vacuum is equal to...', options: ['Speed of sound', 'Speed of light (c)', 'Depends on frequency', 'Depends on amplitude'], correctOption: 1, classLevel: 11, difficulty: 2 },
        { text: 'Which principle states that every point on a wavefront acts as a source of secondary spherical waves?', options: ['Fermat\'s Principle', 'Snell\'s Law', 'Huygens\' Principle', 'Heisenberg Principle'], correctOption: 2, classLevel: 11, difficulty: 3 },
        { text: 'The phenomenon where light waves bend around obstacles is called...', options: ['Reflection', 'Refraction', 'Diffraction', 'Interference'], correctOption: 2, classLevel: 11, difficulty: 2 },
        { text: 'Young\'s double-slit experiment demonstrated the...', options: ['Particle nature of light', 'Wave nature of light (Interference)', 'Speed of light', 'Photoelectric effect'], correctOption: 1, classLevel: 11, difficulty: 3 },
        { text: 'Light vibrating in only one plane is said to be...', options: ['Diffracted', 'Refracted', 'Polarized', 'Dispersed'], correctOption: 2, classLevel: 11, difficulty: 3 },
        { text: 'The separation of white light into its component colors by a prism is called...', options: ['Dispersion', 'Diffraction', 'Polarization', 'Interference'], correctOption: 0, classLevel: 11, difficulty: 2 },
        { text: 'In electromagnetism, magnetic flux is measured in...', options: ['Tesla', 'Weber', 'Henry', 'Farad'], correctOption: 1, classLevel: 11, difficulty: 3 },
        { text: 'In an AC circuit with only a capacitor, the current...', options: ['Lags the voltage by 90°', 'Leads the voltage by 90°', 'Is in phase with the voltage', 'Is zero'], correctOption: 1, classLevel: 11, difficulty: 3 },
        { text: 'Electromagnetic waves with the highest frequency and energy are...', options: ['Radio waves', 'Microwaves', 'X-rays', 'Gamma rays'], correctOption: 3, classLevel: 11, difficulty: 2 },
        { text: 'The ratio of the speed of light in a vacuum to its speed in a given medium is the...', options: ['Index of refraction', 'Critical angle', 'Dispersion coefficient', 'Focal length'], correctOption: 0, classLevel: 11, difficulty: 2 },
        { text: 'Total internal reflection occurs when passing from a...', options: ['More dense to less dense medium, past the critical angle', 'Less dense to more dense medium', 'Medium with lower refractive index to higher', 'Vacuum to air'], correctOption: 0, classLevel: 11, difficulty: 3 },
        { text: 'Radar uses which type of electromagnetic waves?', options: ['Gamma rays', 'Radio waves/Microwaves', 'Infrared', 'Ultraviolet'], correctOption: 1, classLevel: 11, difficulty: 2 },

        // === GRADE 12 === (Quantum Optics, Atomic & Nuclear Physics)
        { text: 'The emission of electrons from a metal surface when light shines on it is the...', options: ['Compton effect', 'Photoelectric effect', 'Zeeman effect', 'Doppler effect'], correctOption: 1, classLevel: 12, difficulty: 2 },
        { text: 'According to Max Planck, light energy is emitted and absorbed in discrete packets called...', options: ['Electrons', 'Protons', 'Quanta (Photons)', 'Neutrinos'], correctOption: 2, classLevel: 12, difficulty: 2 },
        { text: 'Einstein\'s photoelectric equation is...', options: ['E = mc²', 'hf = A + K_max (Work function + Kinetic Energy)', 'F = ma', 'pV = nRT'], correctOption: 1, classLevel: 12, difficulty: 3 },
        { text: 'The energy of a photon is directly proportional to its...', options: ['Wavelength', 'Speed', 'Frequency', 'Amplitude'], correctOption: 2, classLevel: 12, difficulty: 2 },
        { text: 'Who proposed the planetary model of the atom with electrons in specific stationary orbits?', options: ['Thomson', 'Rutherford', 'Bohr', 'Schrödinger'], correctOption: 2, classLevel: 12, difficulty: 2 },
        { text: 'When an electron jumps from a higher energy level to a lower one, it...', options: ['Absorbs a photon', 'Emits a photon', 'Becomes a proton', 'Splits the nucleus'], correctOption: 1, classLevel: 12, difficulty: 2 },
        { text: 'The nucleus of an atom consists of...', options: ['Electrons and protons', 'Protons and neutrons (Nucleons)', 'Neutrons and electrons', 'Only protons'], correctOption: 1, classLevel: 12, difficulty: 1 },
        { text: 'What force holds the protons and neutrons together in the nucleus?', options: ['Gravitational force', 'Electromagnetic force', 'Weak nuclear force', 'Strong nuclear force'], correctOption: 3, classLevel: 12, difficulty: 2 },
        { text: 'The difference between the mass of separate nucleons and the mass of the nucleus is called...', options: ['Mass defect', 'Binding energy', 'Isotope effect', 'Critical mass'], correctOption: 0, classLevel: 12, difficulty: 3 },
        { text: 'Einstein\'s mass-energy equivalence principle is expressed as...', options: ['E = hf', 'E = 1/2 mv²', 'E = mc²', 'E = mgh'], correctOption: 2, classLevel: 12, difficulty: 1 },
        { text: 'Alpha decay reduces the atomic number of a nucleus by...', options: ['1', '2', '3', '4'], correctOption: 1, classLevel: 12, difficulty: 3 },
        { text: 'In Beta minus (β-) decay, what particle is emitted?', options: ['Helium nucleus', 'Positron', 'Photon', 'Electron'], correctOption: 3, classLevel: 12, difficulty: 3 },
        { text: 'The splitting of a heavy nucleus into lighter ones is called...', options: ['Nuclear fusion', 'Nuclear fission', 'Alpha decay', 'Annihilation'], correctOption: 1, classLevel: 12, difficulty: 2 },
        { text: 'The process combining light nuclei into a heavier one, powering the Sun, is...', options: ['Nuclear fission', 'Radioactivity', 'Nuclear fusion', 'Chain reaction'], correctOption: 2, classLevel: 12, difficulty: 2 },
        { text: 'A reaction where the products promote further reactions (like in a nuclear reactor) is a...', options: ['Chain reaction', 'Endothermic reaction', 'Exothermic reaction', 'Fusion reaction'], correctOption: 0, classLevel: 12, difficulty: 2 },
        { text: 'The Heisenberg Uncertainty Principle states we cannot perfectly know a particle\'s...', options: ['Mass and charge', 'Position and momentum simultaneously', 'Energy and spin', 'Wavelength and frequency'], correctOption: 1, classLevel: 12, difficulty: 3 },
        { text: 'De Broglie proposed that moving particles (like electrons) also behave like...', options: ['Waves', 'Planets', 'Magnets', 'Springs'], correctOption: 0, classLevel: 12, difficulty: 3 },
        { text: 'A device used for detecting ionizing radiation is a...', options: ['Galvanometer', 'Geiger-Müller counter', 'Oscilloscope', 'Spectrometer'], correctOption: 1, classLevel: 12, difficulty: 2 },
        { text: 'According to Special Relativity, the speed of light in a vacuum is...', options: ['Relative to the observer', 'Constant for all inertial observers', 'Infinite', 'Slower moving towards gravity'], correctOption: 1, classLevel: 12, difficulty: 2 },
        { text: 'Antimatter equivalent of an electron is a...', options: ['Proton', 'Neutron', 'Positron', 'Muon'], correctOption: 2, classLevel: 12, difficulty: 2 },
    ]

    for (const q of questions) {
        await prisma.question.create({
            data: {
                subject: subject,
                text: q.text,
                type: 'MCQ',
                options: JSON.stringify(q.options),
                correctOption: q.correctOption,
                classLevel: q.classLevel,
                difficulty: q.difficulty,
            },
        })
    }

    console.log(`\nSuccessfully inserted ${questions.length} questions for ${subject}.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
