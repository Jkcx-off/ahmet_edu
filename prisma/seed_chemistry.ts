import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const subject = 'Chemistry'
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
        // === GRADE 6 === (Basic Natural Science / Introduction to matter)
        { text: 'What is everything around us made of?', options: ['Light', 'Matter', 'Thoughts', 'Energy'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'Which state of matter has a definite shape and volume?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], correctOption: 0, classLevel: 6, difficulty: 1 },
        { text: 'What happens to water when it freezes?', options: ['It turns into a gas', 'It turns into a solid (ice)', 'It becomes plasma', 'It disappears'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'Which of the following is an example of a mixture?', options: ['Gold', 'Oxygen', 'Saltwater', 'Iron'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'What process changes a liquid into a gas?', options: ['Melting', 'Freezing', 'Evaporation', 'Condensation'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'Which tool is used to separate iron nails from sand?', options: ['Filter paper', 'Magnet', 'Thermometer', 'Ruler'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'What process occurs when water vapor turns into liquid water?', options: ['Melting', 'Condensation', 'Evaporation', 'Sublimation'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'Which of the following is a physical change?', options: ['Burning wood', 'Rusting iron', 'Melting ice', 'Baking a cake'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'What is the most abundant gas in the air we breathe?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Helium'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'Which state of matter takes the shape of its container but has a fixed volume?', options: ['Solid', 'Gas', 'Liquid', 'Air'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'How can you separate salt from water?', options: ['By filtering', 'By using a magnet', 'By evaporation', 'By freezing'], correctOption: 2, classLevel: 6, difficulty: 2 },
        { text: 'What is the natural state of iron at room temperature?', options: ['Gas', 'Liquid', 'Solid', 'Plasma'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'Which of the following is NOT matter?', options: ['Water', 'Air', 'Sound', 'Wood'], correctOption: 2, classLevel: 6, difficulty: 2 },
        { text: 'The tiny particles that make up all matter are called...', options: ['Cells', 'Atoms', 'Drops', 'Grains'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'A mixture where one substance dissolves completely in another is called a...', options: ['Solution', 'Suspension', 'Solid', 'Gas'], correctOption: 0, classLevel: 6, difficulty: 2 },
        { text: 'What do we call the temperature at which a liquid turns into a solid?', options: ['Boiling point', 'Melting point', 'Freezing point', 'Dew point'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'Which of these materials is a good conductor of heat?', options: ['Wood', 'Plastic', 'Metal (e.g., Copper)', 'Rubber'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'What happens to the particles in a substance when it is heated?', options: ['They stop moving', 'They move slower', 'They move faster', 'They shrink'], correctOption: 2, classLevel: 6, difficulty: 2 },
        { text: 'Which of these is a pure substance?', options: ['Air', 'Soil', 'Distilled water', 'Milk'], correctOption: 2, classLevel: 6, difficulty: 2 },
        { text: 'What is the change of state from solid directly to gas called?', options: ['Evaporation', 'Sublimation', 'Condensation', 'Melting'], correctOption: 1, classLevel: 6, difficulty: 3 },

        // === GRADE 7 === (Introduction to Chemistry / Basic properties)
        { text: 'Chemistry is primarily the study of...', options: ['Living organisms', 'Plants', 'Substances, their properties, and transformations', 'Stars and planets'], correctOption: 2, classLevel: 7, difficulty: 1 },
        { text: 'Which of these indicates a chemical reaction has taken place?', options: ['Ice melting', 'Paper being cut', 'Change of color and release of gas', 'Water boiling'], correctOption: 2, classLevel: 7, difficulty: 1 },
        { text: 'What is the chemical symbol for Oxygen?', options: ['Ox', 'O', 'Om', 'O2'], correctOption: 1, classLevel: 7, difficulty: 1 },
        { text: 'A simple substance consists of atoms of...', options: ['Different chemical elements', 'Only one chemical element', 'Water and air', 'Metals only'], correctOption: 1, classLevel: 7, difficulty: 2 },
        { text: 'What is the chemical formula for water?', options: ['H2O', 'CO2', 'O2', 'NaCl'], correctOption: 0, classLevel: 7, difficulty: 1 },
        { text: 'Who created the Periodic Table of Chemical Elements?', options: ['Isaac Newton', 'Dmitri Mendeleev', 'Albert Einstein', 'Marie Curie'], correctOption: 1, classLevel: 7, difficulty: 1 },
        { text: 'Which of the following describes a chemical property?', options: ['Density', 'Color', 'Combustibility (ability to burn)', 'Melting point'], correctOption: 2, classLevel: 7, difficulty: 2 },
        { text: 'What is a molecule?', options: ['The smallest particle of an element in chemical reactions', 'The smallest particle of a substance that retains its chemical properties', 'A type of atom', 'A mixture of metals'], correctOption: 1, classLevel: 7, difficulty: 2 },
        { text: 'The phenomenon of particles of one substance mixing with particles of another is called...', options: ['Diffusion', 'Distillation', 'Filtration', 'Sublimation'], correctOption: 0, classLevel: 7, difficulty: 1 },
        { text: 'Which of these is a complex substance (compound)?', options: ['Iron (Fe)', 'Oxygen (O2)', 'Carbon dioxide (CO2)', 'Gold (Au)'], correctOption: 2, classLevel: 7, difficulty: 2 },
        { text: 'In a chemical reaction, the substances you start with are called...', options: ['Products', 'Reactants (Reagents)', 'Mixtures', 'Catalysts'], correctOption: 1, classLevel: 7, difficulty: 1 },
        { text: 'The total mass of substances before a chemical reaction is... the mass of the products.', options: ['Greater than', 'Less than', 'Equal to', 'Unrelated to'], correctOption: 2, classLevel: 7, difficulty: 2 },
        { text: 'What do we call a substance that speeds up a chemical reaction without being consumed?', options: ['Product', 'Reactant', 'Catalyst', 'Inhibitor'], correctOption: 2, classLevel: 7, difficulty: 2 },
        { text: 'Air is a...', options: ['Pure substance', 'Compound', 'Homogeneous mixture', 'Element'], correctOption: 2, classLevel: 7, difficulty: 2 },
        { text: 'Which element is essential for combustion (burning)?', options: ['Nitrogen', 'Hydrogen', 'Carbon Dioxide', 'Oxygen'], correctOption: 3, classLevel: 7, difficulty: 1 },
        { text: 'The number of protons in an atom’s nucleus is its...', options: ['Atomic mass', 'Atomic number', 'Valence', 'Isotope number'], correctOption: 1, classLevel: 7, difficulty: 2 },
        { text: 'What type of mixture is milk?', options: ['Solution', 'Emulsion (Colloid)', 'Pure substance', 'Simple compound'], correctOption: 1, classLevel: 7, difficulty: 3 },
        { text: 'To separate a mixture of water and alcohol, which method is best?', options: ['Filtration', 'Use a magnet', 'Distillation', 'Manual sorting'], correctOption: 2, classLevel: 7, difficulty: 3 },
        { text: 'Which of the following is a heavy, liquid metal at room temperature?', options: ['Iron', 'Gold', 'Mercury', 'Lead'], correctOption: 2, classLevel: 7, difficulty: 2 },
        { text: 'The chemical symbol for Carbon is...', options: ['Ca', 'Co', 'C', 'Cr'], correctOption: 2, classLevel: 7, difficulty: 1 },

        // === GRADE 8 === (Atoms, Molecules, Inorganic Classes)
        { text: 'What is the valence of Hydrogen in compounds?', options: ['I', 'II', 'III', 'IV'], correctOption: 0, classLevel: 8, difficulty: 1 },
        { text: 'What is the sum of protons and neutrons in an atom called?', options: ['Atomic number', 'Mass number', 'Isotope number', 'Valence'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'Complex substances consisting of oxygen and one other element are called...', options: ['Acids', 'Bases', 'Oxides', 'Salts'], correctOption: 2, classLevel: 8, difficulty: 1 },
        { text: 'Acids are complex substances containing...', options: ['Hydroxyl groups (-OH)', 'Hydrogen atoms (H) that can be replaced by a metal', 'Only oxygen', 'Only carbon'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'Bases (hydroxides) always contain which functional group?', options: ['-COOH', '-OH (Hydroxyl group)', '-NH2', '-Cl'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'The reaction between an acid and a base to form salt and water is called...', options: ['Decomposition', 'Neutralization', 'Synthesis', 'Combustion'], correctOption: 1, classLevel: 8, difficulty: 1 },
        { text: 'What is the formula of Sulfuric Acid?', options: ['HCl', 'HNO3', 'H2SO4', 'H2CO3'], correctOption: 2, classLevel: 8, difficulty: 2 },
        { text: 'Which of these is a typical property of metals?', options: ['Poor conductivity of heat', 'High electrical conductivity', 'Brittleness', 'Gaseous state at room temperature'], correctOption: 1, classLevel: 8, difficulty: 1 },
        { text: 'In the formula CO2, the number "2" is called an...', options: ['Coefficient', 'Index (Subscript)', 'Isotope', 'Charge'], correctOption: 1, classLevel: 8, difficulty: 1 },
        { text: 'What type of chemical bond forms between a metal and a non-metal?', options: ['Covalent non-polar', 'Covalent polar', 'Ionic', 'Metallic'], correctOption: 2, classLevel: 8, difficulty: 2 },
        { text: 'What type of chemical bond forms between two identical non-metal atoms (e.g., O2)?', options: ['Covalent non-polar', 'Ionic', 'Hydrogen', 'Metallic'], correctOption: 0, classLevel: 8, difficulty: 3 },
        { text: 'Atoms of the same element with different numbers of neutrons are called...', options: ['Ions', 'Allotropes', 'Isotopes', 'Isomers'], correctOption: 2, classLevel: 8, difficulty: 2 },
        { text: 'Which of the following is an alkali (soluble base)?', options: ['Cu(OH)2', 'Fe(OH)3', 'NaOH', 'Al(OH)3'], correctOption: 2, classLevel: 8, difficulty: 3 },
        { text: 'What is the name of the salt formed from Hydrochloric acid (HCl)?', options: ['Sulfate', 'Nitrate', 'Chloride', 'Carbonate'], correctOption: 2, classLevel: 8, difficulty: 2 },
        { text: 'In the Periodic Table, vertical columns are called...', options: ['Periods', 'Groups', 'Blocks', 'Rows'], correctOption: 1, classLevel: 8, difficulty: 1 },
        { text: 'What is the molar volume of any ideal gas at Standard Temperature and Pressure (STP)?', options: ['22.4 L/mol', '11.2 L/mol', '44.8 L/mol', '1 L/mol'], correctOption: 0, classLevel: 8, difficulty: 3 },
        { text: 'Avogadro’s number is approximately...', options: ['6.02 × 10^23', '3.14', '9.81', '3.00 × 10^8'], correctOption: 0, classLevel: 8, difficulty: 2 },
        { text: 'What type of reaction is: 2H2 + O2 -> 2H2O?', options: ['Decomposition', 'Combination (Synthesis)', 'Single replacement', 'Double replacement'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'A negatively charged ion is called an...', options: ['Cation', 'Anion', 'Positron', 'Proton'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'Which element is an inert (noble) gas?', options: ['Chlorine', 'Neon', 'Oxygen', 'Sodium'], correctOption: 1, classLevel: 8, difficulty: 1 },

        // === GRADE 9 === (Electrolytic dissociation, Non-metals)
        { text: 'Substances whose aqueous solutions conduct electricity are called...', options: ['Non-electrolytes', 'Electrolytes', 'Insulators', 'Polymers'], correctOption: 1, classLevel: 9, difficulty: 1 },
        { text: 'The break-up of electrolyte molecules into ions in water is called...', options: ['Electrolytic dissociation', 'Distillation', 'Hydration', 'Evaporation'], correctOption: 0, classLevel: 9, difficulty: 2 },
        { text: 'According to Arrhenius, an acid dissociates in water to produce which ions?', options: ['OH-', 'Na+', 'H+ (Hydrogen ions)', 'Cl-'], correctOption: 2, classLevel: 9, difficulty: 2 },
        { text: 'Which halogen is a greenish-yellow toxic gas?', options: ['Fluorine', 'Bromine', 'Iodine', 'Chlorine'], correctOption: 3, classLevel: 9, difficulty: 2 },
        { text: 'What is the chemical formula of Ammonia?', options: ['N2', 'NH4+', 'NH3', 'NO2'], correctOption: 2, classLevel: 9, difficulty: 2 },
        { text: 'Which allotropic form of carbon is the hardest natural substance?', options: ['Graphite', 'Diamond', 'Coal', 'Fullerene'], correctOption: 1, classLevel: 9, difficulty: 1 },
        { text: 'What gas is evolved when a metal reacts with a dilute acid (like HCl)?', options: ['Oxygen', 'Carbon Dioxide', 'Hydrogen', 'Chlorine'], correctOption: 2, classLevel: 9, difficulty: 2 },
        { text: 'Nitric acid (HNO3) is a strong acid. Which gas is commonly produced when it reacts with copper (depending on concentration)?', options: ['H2', 'CO2', 'NO2 (Nitrogen dioxide)', 'Cl2'], correctOption: 2, classLevel: 9, difficulty: 3 },
        { text: 'Which acid is found in the human stomach to aid digestion?', options: ['Sulfuric acid', 'Hydrochloric acid (HCl)', 'Nitric acid', 'Acetic acid'], correctOption: 1, classLevel: 9, difficulty: 1 },
        { text: 'Ozone is an allotropic modification of which element?', options: ['Nitrogen', 'Oxygen', 'Carbon', 'Phosphorus'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: 'What is the color of Bromine (Br2) under standard conditions?', options: ['Colorless gas', 'Violet solid', 'Red-brown liquid', 'Yellow gas'], correctOption: 2, classLevel: 9, difficulty: 3 },
        { text: 'Which substance is used to test for the presence of Carbon Dioxide in the laboratory?', options: ['Litmus paper', 'Limewater (Ca(OH)2 solution)', 'Iodine solution', 'Barium chloride'], correctOption: 1, classLevel: 9, difficulty: 3 },
        { text: 'Which element is essential for organic compounds?', options: ['Silicon', 'Iron', 'Carbon', 'Calcium'], correctOption: 2, classLevel: 9, difficulty: 1 },
        { text: 'A reaction in which oxidation states of atoms change is called...', options: ['Neutralization', 'Redox (Oxidation-Reduction) reaction', 'Precipitation', 'Isomerization'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: 'In a redox reaction, the substance that loses electrons is...', options: ['Reduced', 'Oxidized', 'A catalyst', 'An inhibitor'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: 'Which elements are classified as alkali metals?', options: ['Li, Na, K', 'Be, Mg, Ca', 'F, Cl, Br', 'He, Ne, Ar'], correctOption: 0, classLevel: 9, difficulty: 2 },
        { text: 'What is the process of making ammonia from nitrogen and hydrogen called?', options: ['Contact process', 'Haber-Bosch process', 'Ostwald process', 'Bayer process'], correctOption: 1, classLevel: 9, difficulty: 3 },
        { text: 'Silica (SiO2) is the main component of...', options: ['Coal', 'Diamond', 'Sand and Quartz', 'Chalk'], correctOption: 2, classLevel: 9, difficulty: 1 },
        { text: 'Which phosphorus allotrope must be stored under water because it burns in air?', options: ['Red phosphorus', 'Black phosphorus', 'White phosphorus', 'Yellow phosphorus'], correctOption: 2, classLevel: 9, difficulty: 3 },
        { text: 'What is the valence of Carbon in carbon dioxide (CO2)?', options: ['I', 'II', 'III', 'IV'], correctOption: 3, classLevel: 9, difficulty: 2 },

        // === GRADE 10 === (Organic Chemistry Basics)
        { text: 'Organic chemistry is the chemistry of compounds containing...', options: ['Oxygen', 'Carbon', 'Sulfur', 'Nitrogen'], correctOption: 1, classLevel: 10, difficulty: 1 },
        { text: 'Who formulated the theory of chemical structure for organic compounds?', options: ['Mendeleev', 'Lomonosov', 'Butlerov', 'Bohr'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'Which hydrocarbons contain only single carbon-carbon bonds?', options: ['Alkenes', 'Alkynes', 'Alkanes', 'Aromatics'], correctOption: 2, classLevel: 10, difficulty: 1 },
        { text: 'What is the general formula for alkanes?', options: ['CnH2n', 'CnH2n+2', 'CnH2n-2', 'CnHn'], correctOption: 1, classLevel: 10, difficulty: 2 },
        { text: 'Methane has the chemical formula...', options: ['C2H6', 'CH4', 'C3H8', 'CH3OH'], correctOption: 1, classLevel: 10, difficulty: 1 },
        { text: 'Compounds with the same molecular formula but different chemical structures are called...', options: ['Isotopes', 'Homologs', 'Isomers', 'Polymers'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'Alkenes are characterized by having at least one...', options: ['Single bond', 'Double carbon-carbon bond', 'Triple bond', 'Benzene ring'], correctOption: 1, classLevel: 10, difficulty: 1 },
        { text: 'What is the functional group of alcohols?', options: ['-COOH', '-NH2', '-OH (Hydroxyl)', '-CHO'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'The common name for ethanoic acid is...', options: ['Formic acid', 'Acetic acid', 'Citric acid', 'Lactic acid'], correctOption: 1, classLevel: 10, difficulty: 2 },
        { text: 'Which organic compound represents a closed 6-carbon ring with alternating double bonds?', options: ['Cyclohexane', 'Benzene', 'Hexene', 'Phenol'], correctOption: 1, classLevel: 10, difficulty: 2 },
        { text: 'The reaction of joining many small molecules (monomers) into a large one is called...', options: ['Cracking', 'Hydrogenation', 'Polymerization', 'Hydrolysis'], correctOption: 2, classLevel: 10, difficulty: 1 },
        { text: 'What is the simplest alkyne, commonly used in welding torches?', options: ['Methane', 'Ethene', 'Acetylene (Ethyne)', 'Propane'], correctOption: 2, classLevel: 10, difficulty: 3 },
        { text: 'The reaction of an alcohol with a carboxylic acid produces an...', options: ['Ether', 'Ester', 'Aldehyde', 'Ketone'], correctOption: 1, classLevel: 10, difficulty: 3 },
        { text: 'Proteins are natural polymers made up of...', options: ['Nucleotides', 'Fatty acids', 'Amino acids', 'Monosaccharides'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'Which functional group characterizes aldehydes?', options: ['-COOH', '-OH', '-CHO', '-NH2'], correctOption: 2, classLevel: 10, difficulty: 3 },
        { text: 'Saponification is the process of making...', options: ['Plastics', 'Explosives', 'Soap', 'Alcohols'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'What are the products of the complete combustion of a hydrocarbon?', options: ['Carbon and Hydrogen', 'Carbon monoxide and Water', 'Carbon dioxide and Water', 'Methane and Oxygen'], correctOption: 2, classLevel: 10, difficulty: 1 },
        { text: 'Which gas is responsible for the ripening of fruits?', options: ['Methane', 'Ethylene (Ethene)', 'Ethyne', 'Propane'], correctOption: 1, classLevel: 10, difficulty: 3 },
        { text: 'Cellulose and starch belong to which class of organic compounds?', options: ['Proteins', 'Lipids', 'Carbohydrates', 'Nucleic acids'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'Qualitative test for multiple bonds (alkenes, alkynes) is decolorizing...', options: ['Limewater', 'Bromine water', 'Copper sulfate', 'Phenolphthalein'], correctOption: 1, classLevel: 10, difficulty: 3 },

        // === GRADE 11 === (Advanced General Chemistry & Kinetics)
        { text: 'The rate of a chemical reaction generally increases if the temperature is...', options: ['Decreased', 'Increased', 'Kept constant', 'Removed'], correctOption: 1, classLevel: 11, difficulty: 1 },
        { text: 'Le Chatelier\'s principle is applied to systems in...', options: ['A state of explosion', 'Chemical equilibrium', 'Nuclear decay', 'A solid state only'], correctOption: 1, classLevel: 11, difficulty: 2 },
        { text: 'If a reaction is exothermic, increasing the temperature will shift the equilibrium towards...', options: ['The products', 'The reactants', 'It won\'t shift', 'It stops the reaction'], correctOption: 1, classLevel: 11, difficulty: 3 },
        { text: 'What does a catalyst do to the activation energy of a reaction?', options: ['Increases it', 'Lowers it', 'Leaves it unchanged', 'Makes it zero'], correctOption: 1, classLevel: 11, difficulty: 2 },
        { text: 'Which particle defines the chemical properties of an atom?', options: ['Proton', 'Neutron', 'Electron (specifically valence)', 'Positron'], correctOption: 2, classLevel: 11, difficulty: 2 },
        { text: 'The pH scale measures the concentration of which ions in a solution?', options: ['Sodium ions (Na+)', 'Chloride ions (Cl-)', 'Hydrogen ions (H+)', 'Hydroxide ions (OH-)'], correctOption: 2, classLevel: 11, difficulty: 2 },
        { text: 'A solution with a pH of 3 is classified as...', options: ['Strongly basic', 'Weakly basic', 'Neutral', 'Acidic'], correctOption: 3, classLevel: 11, difficulty: 1 },
        { text: 'What is the standard enthalpy of formation of an element in its standard state?', options: ['100 kJ/mol', '1 kJ/mol', '0 (Zero)', 'Variable'], correctOption: 2, classLevel: 11, difficulty: 3 },
        { text: 'In the galvanic cell (Daniel-Jacobi cell), oxidation occurs at the...', options: ['Cathode', 'Salt bridge', 'Anode', 'Electrolyte'], correctOption: 2, classLevel: 11, difficulty: 3 },
        { text: 'What rule dictates that atoms tend to have 8 electrons in their outer shell?', options: ['Markovnikov\'s rule', 'Hund\'s rule', 'The Octet rule', 'Pauli exclusion principle'], correctOption: 2, classLevel: 11, difficulty: 2 },
        { text: 'Which type of crystal lattice does Diamond have?', options: ['Ionic', 'Metallic', 'Atomic (Covalent network)', 'Molecular'], correctOption: 2, classLevel: 11, difficulty: 3 },
        { text: 'Electrolysis of a NaCl aqueous solution produces ... at the cathode.', options: ['Sodium metal (Na)', 'Chlorine gas (Cl2)', 'Oxygen gas (O2)', 'Hydrogen gas (H2)'], correctOption: 3, classLevel: 11, difficulty: 3 },
        { text: 'What happens to the rate of a chemical reaction if the concentration of reactants is increased?', options: ['It increases', 'It decreases', 'It remains the same', 'It becomes negative'], correctOption: 0, classLevel: 11, difficulty: 1 },
        { text: 'A bond formed by the unequal sharing of electron pairs is called...', options: ['Non-polar covalent', 'Polar covalent', 'Ionic', 'Hydrogen'], correctOption: 1, classLevel: 11, difficulty: 2 },
        { text: 'Which metal is the best conductor of electricity?', options: ['Gold', 'Copper', 'Aluminum', 'Silver'], correctOption: 3, classLevel: 11, difficulty: 2 },
        { text: 'Hard water contains high concentrations of which ions?', options: ['Na+ and K+', 'Ca2+ and Mg2+', 'Fe2+ and Cu2+', 'Cl- and SO4 2-'], correctOption: 1, classLevel: 11, difficulty: 2 },
        { text: 'Which acid is known as "aqua fortis" and is a strong oxidizing agent?', options: ['Hydrochloric acid', 'Sulfuric acid', 'Nitric acid', 'Phosphoric acid'], correctOption: 2, classLevel: 11, difficulty: 3 },
        { text: 'The destruction of metals due to chemical interaction with the environment is called...', options: ['Alloying', 'Corrosion', 'Reduction', 'Sublimation'], correctOption: 1, classLevel: 11, difficulty: 1 },
        { text: 'Polymers that can be melted and reshaped repeatedly are called...', options: ['Thermosetting polymers', 'Thermoplastics', 'Elastomers', 'Resins'], correctOption: 1, classLevel: 11, difficulty: 3 },
        { text: 'What reagent is used to distinguish an aldehyde from a ketone (Silver mirror test)?', options: ['Tollens\' reagent', 'Benedict\'s reagent', 'Lugol\'s iodine', 'Litmus'], correctOption: 0, classLevel: 11, difficulty: 3 },

        // === GRADE 12 === (Advanced Organic Chemistry & Biochemistry)
        { text: 'Which of the following compounds exhibits geometric (cis-trans) isomerism?', options: ['1-butene', '2-butene', 'Propene', 'Ethene'], correctOption: 1, classLevel: 12, difficulty: 3 },
        { text: 'In electrophilic aromatic substitution, which group is ortho/para-directing?', options: ['-NO2', '-COOH', '-CH3', '-SO3H'], correctOption: 2, classLevel: 12, difficulty: 3 },
        { text: 'What is the product of the hydration of ethyne (acetylene) in the presence of Hg2+ and H2SO4 (Kucherov reaction)?', options: ['Ethanol', 'Ethanal (Acetaldehyde)', 'Ethanoic acid', 'Ethane'], correctOption: 1, classLevel: 12, difficulty: 3 },
        { text: 'A reaction where two molecules join with the loss of a small molecule (like water) is called a...', options: ['Condensation reaction', 'Addition reaction', 'Elimination reaction', 'Oxidation reaction'], correctOption: 0, classLevel: 12, difficulty: 2 },
        { text: 'Which of the following amino acids contains sulfur?', options: ['Glycine', 'Alanine', 'Cysteine', 'Valine'], correctOption: 2, classLevel: 12, difficulty: 2 },
        { text: 'The secondary structure of a protein (alpha-helix, beta-pleated sheet) is primarily stabilized by...', options: ['Peptide bonds', 'Disulfide bridges', 'Hydrogen bonds', 'Ionic bonds'], correctOption: 2, classLevel: 12, difficulty: 3 },
        { text: 'What is the base opposite to Adenine in RNA?', options: ['Thymine', 'Guanine', 'Uracil', 'Cytosine'], correctOption: 2, classLevel: 12, difficulty: 1 },
        { text: 'Nucleotides are formed by a nitrogenous base, a pentose sugar, and a...', options: ['Sulfate group', 'Phosphate group', 'Nitrate group', 'Carboxylate group'], correctOption: 1, classLevel: 12, difficulty: 2 },
        { text: 'What happens during the denaturation of a protein?', options: ['Peptide bonds are broken', 'Secondary, tertiary, and quaternary structures are disrupted', 'It turns into a lipid', 'It gains function'], correctOption: 1, classLevel: 12, difficulty: 2 },
        { text: 'Which fat contains predominantly unsaturated fatty acids and is liquid at room temperature?', options: ['Butter', 'Vegetable oil', 'Lard', 'Tallow'], correctOption: 1, classLevel: 12, difficulty: 1 },
        { text: 'Carbohydrates stored in the human liver and muscles for energy are called...', options: ['Starch', 'Cellulose', 'Glycogen', 'Sucrose'], correctOption: 2, classLevel: 12, difficulty: 2 },
        { text: 'Which test is used to detect the presence of peptide bonds (proteins)?', options: ['Biuret test', 'Benedict\'s test', 'Iodine test', 'Sudan III test'], correctOption: 0, classLevel: 12, difficulty: 3 },
        { text: 'Enantiomers are stereoisomers that are...', options: ['Superimposable mirror images', 'Non-superimposable mirror images', 'Structural isomers', 'Different completely'], correctOption: 1, classLevel: 12, difficulty: 3 },
        { text: 'Which carbon is considered a "chiral center"?', options: ['One attached to four identical groups', 'One attached to four different groups', 'A carbon in a double bond', 'One attached to three identical groups'], correctOption: 1, classLevel: 12, difficulty: 2 },
        { text: 'The sequence of amino acids in a polypeptide chain is the protein\'s...', options: ['Primary structure', 'Secondary structure', 'Tertiary structure', 'Quaternary structure'], correctOption: 0, classLevel: 12, difficulty: 2 },
        { text: 'What is the main function of ATP (Adenosine Triphosphate)?', options: ['Storing genetic information', 'Building cell membranes', 'Immediate energy source for cellular activity', 'Enzymatic catalysis'], correctOption: 2, classLevel: 12, difficulty: 1 },
        { text: 'A mixture of two enantiomers in equal proportions is called a...', options: ['Meso compound', 'Racemic mixture', 'Diastereomer', 'Azeotrope'], correctOption: 1, classLevel: 12, difficulty: 3 },
        { text: 'Which type of RNA brings amino acids to the ribosome during translation?', options: ['mRNA', 'rRNA', 'tRNA', 'snRNA'], correctOption: 2, classLevel: 12, difficulty: 2 },
        { text: 'Markovnikov\'s rule applies to which type of reaction?', options: ['Electrophilic substitution', 'Electrophilic addition to unsymmetrical alkenes', 'Nucleophilic substitution', 'Elimination'], correctOption: 1, classLevel: 12, difficulty: 3 },
        { text: 'In the body, the breakdown of large molecules into smaller ones to release energy is called...', options: ['Anabolism', 'Catabolism', 'Photosynthesis', 'Polymerization'], correctOption: 1, classLevel: 12, difficulty: 2 },
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
