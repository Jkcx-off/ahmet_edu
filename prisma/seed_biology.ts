import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const subject = 'Biology'
    console.log(`Seeding questions for ${subject}...`)

    // Clear existing questions
    await prisma.question.deleteMany({
        where: { subject }
    })
    console.log('Cleared existing Biology questions.')

    type QDef = {
        text: string
        options: string[]
        correctOption: number
        classLevel: number
        difficulty: number
    }

    const questions: QDef[] = [
        // === GRADE 6 === (20 Questions - Basic Nature, Plant Parts, Animals)
        { text: 'Which part of the plant absorbs water?', options: ['Leaves', 'Stem', 'Roots', 'Flower'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'Which animal gives birth to live babies and has fur?', options: ['Reptile', 'Bird', 'Mammal', 'Amphibian'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'What do bees collect from flowers?', options: ['Seeds', 'Nectar', 'Water', 'Leaves'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'What is the main source of energy for the Earth?', options: ['Moon', 'Stars', 'Sun', 'Fire'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'Which of the following is an example of an insect?', options: ['Spider', 'Ant', 'Worm', 'Snail'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'An animal that eats both plants and animals is a(n)...', options: ['Herbivore', 'Carnivore', 'Omnivore', 'Decomposer'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'What green pigment helps plants make food?', options: ['Melanin', 'Chlorophyll', 'Hemoglobin', 'Keratin'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'Frogs start their lives in water as...', options: ['Pupae', 'Tadpoles', 'Larvae', 'Nymphs'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'Which gas do humans breathe out?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Helium'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'A group of lions is called a...', options: ['Pack', 'Herd', 'Pride', 'Flock'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'Which part of a plant turns into a fruit?', options: ['Root', 'Stem', 'Leaf', 'Flower'], correctOption: 3, classLevel: 6, difficulty: 2 },
        { text: 'How many legs does an insect have?', options: ['4', '6', '8', '10'], correctOption: 1, classLevel: 6, difficulty: 2 },
        { text: 'Which of these birds cannot fly?', options: ['Eagle', 'Penguin', 'Sparrow', 'Pigeon'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'Fish breathe underwater using...', options: ['Lungs', 'Skin', 'Gills', 'Fins'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'What is a baby dog called?', options: ['Kitten', 'Calf', 'Puppy', 'Cub'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'Which of these is a carnivore?', options: ['Cow', 'Rabbit', 'Lion', 'Sheep'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'What part of a tree protects its trunk?', options: ['Leaves', 'Roots', 'Bark', 'Branches'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'What kind of animal is a frog?', options: ['Mammal', 'Reptile', 'Amphibian', 'Bird'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'A caterpillar turns into a...', options: ['Beetle', 'Butterfly', 'Spider', 'Worm'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'What is the largest land animal?', options: ['Elephant', 'Giraffe', 'Rhino', 'Hippo'], correctOption: 0, classLevel: 6, difficulty: 1 },

        // === GRADE 7 === (20 Questions - Cells, Ecosystems, Classification)
        { text: 'What is the basic unit of life?', options: ['Tissue', 'Organ', 'Cell', 'Organism'], correctOption: 2, classLevel: 7, difficulty: 1 },
        { text: 'Which organelle is the control center of the cell?', options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Vacuole'], correctOption: 1, classLevel: 7, difficulty: 1 },
        { text: 'Which of these is a non-living part of an ecosystem?', options: ['Fungi', 'Bacteria', 'Water', 'Plants'], correctOption: 2, classLevel: 7, difficulty: 1 },
        { text: 'Which kingdom contains mushrooms and yeast?', options: ['Plantae', 'Protista', 'Animalia', 'Fungi'], correctOption: 3, classLevel: 7, difficulty: 2 },
        { text: 'The movement of water from the ground to the air is part of the...', options: ['Carbon cycle', 'Water cycle', 'Nitrogen cycle', 'Food chain'], correctOption: 1, classLevel: 7, difficulty: 1 },
        { text: 'What cell part is found in plant cells but NOT animal cells?', options: ['Cell wall', 'Cell membrane', 'Nucleus', 'Cytoplasm'], correctOption: 0, classLevel: 7, difficulty: 1 },
        { text: 'What do we call a network of many interacting food chains?', options: ['Food pyramid', 'Food web', 'Energy cycle', 'Trophic layer'], correctOption: 1, classLevel: 7, difficulty: 2 },
        { text: 'Bacteria are made of how many cells?', options: ['One', 'Two', 'Hundreds', 'Millions'], correctOption: 0, classLevel: 7, difficulty: 1 },
        { text: 'Which animal group has scales and lays leathery eggs?', options: ['Amphibians', 'Birds', 'Mammals', 'Reptiles'], correctOption: 3, classLevel: 7, difficulty: 1 },
        { text: 'What helps fish float or sink in water?', options: ['Gills', 'Fins', 'Swim bladder', 'Scales'], correctOption: 2, classLevel: 7, difficulty: 2 },
        { text: 'The jelly-like fluid inside a cell is called...', options: ['Nucleoplasm', 'Cytoplasm', 'Chloroplast', 'Vacuole'], correctOption: 1, classLevel: 7, difficulty: 1 },
        { text: 'What is the lowest level of ecological organization?', options: ['Population', 'Ecosystem', 'Community', 'Organism'], correctOption: 3, classLevel: 7, difficulty: 2 },
        { text: 'Animals without a backbone are called...', options: ['Vertebrates', 'Invertebrates', 'Mammals', 'Amphibians'], correctOption: 1, classLevel: 7, difficulty: 1 },
        { text: 'Which tool is used to look at cells?', options: ['Telescope', 'Microscope', 'Stethoscope', 'Periscope'], correctOption: 1, classLevel: 7, difficulty: 1 },
        { text: 'What process do plants use to make food?', options: ['Respiration', 'Photosynthesis', 'Digestion', 'Fermentation'], correctOption: 1, classLevel: 7, difficulty: 1 },
        { text: 'Where does photosynthesis happen in a plant cell?', options: ['Mitochondria', 'Chloroplast', 'Nucleus', 'Ribosome'], correctOption: 1, classLevel: 7, difficulty: 2 },
        { text: 'An relationship where one organism benefits and the other is harmed is...', options: ['Mutualism', 'Commensalism', 'Parasitism', 'Competition'], correctOption: 2, classLevel: 7, difficulty: 2 },
        { text: 'Earthworms belong to which broad grouping?', options: ['Vertebrates', 'Arthropods', 'Invertebrates', 'Mammals'], correctOption: 2, classLevel: 7, difficulty: 1 },
        { text: 'What gas do plants need to take in for photosynthesis?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], correctOption: 1, classLevel: 7, difficulty: 1 },
        { text: 'The place where an organism naturally lives is its...', options: ['Niche', 'Habitat', 'Biome', 'Ecosystem'], correctOption: 1, classLevel: 7, difficulty: 1 },

        // === GRADE 8 === (20 Questions - Human Biology, Digestion, Reproduction)
        { text: 'Which human organ is responsible for pumping blood?', options: ['Brain', 'Lungs', 'Heart', 'Kidneys'], correctOption: 2, classLevel: 8, difficulty: 1 },
        { text: 'The process of breaking down food is called...', options: ['Respiration', 'Circulation', 'Digestion', 'Excretion'], correctOption: 2, classLevel: 8, difficulty: 1 },
        { text: 'Which blood vessels carry oxygenated blood away from the heart?', options: ['Veins', 'Capillaries', 'Arteries', 'Venules'], correctOption: 2, classLevel: 8, difficulty: 2 },
        { text: 'What filters waste from the blood to make urine?', options: ['Liver', 'Kidneys', 'Stomach', 'Lungs'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'Which part of the digestive system absorbs the most nutrients?', options: ['Stomach', 'Large Intestine', 'Small Intestine', 'Esophagus'], correctOption: 2, classLevel: 8, difficulty: 2 },
        { text: 'What is the male reproductive cell called?', options: ['Ovum', 'Sperm', 'Zygote', 'Embryo'], correctOption: 1, classLevel: 8, difficulty: 1 },
        { text: 'The union of a sperm and an egg is called...', options: ['Pollination', 'Fertilization', 'Menstruation', 'Ovulation'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'Which part of the respiratory system contains the vocal cords?', options: ['Trachea', 'Larynx', 'Pharynx', 'Bronchi'], correctOption: 1, classLevel: 8, difficulty: 3 },
        { text: 'What is the body’s largest organ?', options: ['Liver', 'Skin', 'Lungs', 'Heart'], correctOption: 1, classLevel: 8, difficulty: 1 },
        { text: 'How many bones are in the adult human skeleton?', options: ['106', '206', '306', '406'], correctOption: 1, classLevel: 8, difficulty: 1 },
        { text: 'Which joint type is the human knee?', options: ['Ball and socket', 'Hinge', 'Pivot', 'Gliding'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'Where does chemical digestion begin?', options: ['Stomach', 'Esophagus', 'Mouth (Saliva)', 'Small Intestine'], correctOption: 2, classLevel: 8, difficulty: 2 },
        { text: 'What component of blood carries oxygen?', options: ['White blood cells', 'Red blood cells', 'Platelets', 'Plasma'], correctOption: 1, classLevel: 8, difficulty: 1 },
        { text: 'What component of blood fights infections?', options: ['Plasma', 'Red blood cells', 'Platelets', 'White blood cells'], correctOption: 3, classLevel: 8, difficulty: 2 },
        { text: 'What is the main function of the large intestine?', options: ['Absorb nutrients', 'Absorb water', 'Produce acid', 'Break down fats'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'Where do human babies develop before birth?', options: ['Ovary', 'Fallopian tube', 'Uterus', 'Vagina'], correctOption: 2, classLevel: 8, difficulty: 2 },
        { text: 'Which muscle helps push air in and out of the lungs?', options: ['Bicep', 'Heart', 'Diaphragm', 'Tricep'], correctOption: 2, classLevel: 8, difficulty: 2 },
        { text: 'Which system controls sending signals around the body?', options: ['Digestive', 'Nervous', 'Skeletal', 'Respiratory'], correctOption: 1, classLevel: 8, difficulty: 1 },
        { text: 'What connects muscles to bones?', options: ['Ligaments', 'Cartilage', 'Tendons', 'Marrow'], correctOption: 2, classLevel: 8, difficulty: 3 },
        { text: 'The liquid part of the blood is called...', options: ['Hemoglobin', 'Plasma', 'Lymph', 'Serum'], correctOption: 1, classLevel: 8, difficulty: 2 },

        // === GRADE 9 === (20 Questions - Genetics, Evolution, DNA)
        { text: 'Who is known as the "Father of Genetics"?', options: ['Charles Darwin', 'Gregor Mendel', 'Louis Pasteur', 'Isaac Newton'], correctOption: 1, classLevel: 9, difficulty: 1 },
        { text: 'What does DNA stand for?', options: ['Deoxyribonucleic Acid', 'Dual Nitrogen Acid', 'Deoxynitro Acid', 'Dioxyribose Nucleic Atom'], correctOption: 0, classLevel: 9, difficulty: 1 },
        { text: 'The process where organisms better adapted to their environment survive is called...', options: ['Artificial Selection', 'Natural Selection', 'Genetic Drift', 'Mutation'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: 'What are alternative forms of a gene called?', options: ['Chromosomes', 'Alleles', 'Phenotypes', 'Traits'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: 'The physical observable traits of an organism are its...', options: ['Genotype', 'Phenotype', 'Karyotype', 'Prototype'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: 'In DNA, Adenine (A) always pairs with...', options: ['Cytosine (C)', 'Guanine (G)', 'Thymine (T)', 'Uracil (U)'], correctOption: 2, classLevel: 9, difficulty: 2 },
        { text: 'A change in the DNA sequence is called a...', options: ['Replication', 'Translation', 'Mutation', 'Transcription'], correctOption: 2, classLevel: 9, difficulty: 1 },
        { text: 'Humans have how many pairs of chromosomes?', options: ['21', '22', '23', '24'], correctOption: 2, classLevel: 9, difficulty: 1 },
        { text: 'A genotype with two identical alleles (e.g., TT or tt) is...', options: ['Heterozygous', 'Homozygous', 'Codominant', 'Recessive'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: 'Which scientist formulated the theory of evolution by natural selection?', options: ['Mendel', 'Watson', 'Darwin', 'Crick'], correctOption: 2, classLevel: 9, difficulty: 1 },
        { text: 'A trait that is hidden by a dominant trait is called...', options: ['Recessive', 'Phenotypic', 'Co-dominant', 'Mutated'], correctOption: 0, classLevel: 9, difficulty: 1 },
        { text: 'What grid is used to predict genetic outcomes?', options: ['Mendel Square', 'Darwin Grid', 'Punnett Square', 'Genetic Table'], correctOption: 2, classLevel: 9, difficulty: 1 },
        { text: 'Homologous structures in different species suggest...', options: ['Common ancestry', 'Different ancestors', 'Convergent evolution', 'No relationship'], correctOption: 0, classLevel: 9, difficulty: 2 },
        { text: 'What type of cell division produces gametes (sperm/egg)?', options: ['Mitosis', 'Meiosis', 'Binary Fission', 'Budding'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: 'What type of cell division produces identical body cells?', options: ['Meiosis', 'Fertilization', 'Mitosis', 'Conjugation'], correctOption: 2, classLevel: 9, difficulty: 2 },
        { text: 'RNA uses which base instead of Thymine?', options: ['Adenine', 'Cytosine', 'Uracil', 'Guanine'], correctOption: 2, classLevel: 9, difficulty: 2 },
        { text: 'Which process makes an mRNA copy of DNA?', options: ['Translation', 'Replication', 'Transcription', 'Mutation'], correctOption: 2, classLevel: 9, difficulty: 3 },
        { text: 'What is the shape of a DNA molecule described as?', options: ['Single circle', 'Double helix', 'Triple spiral', 'Straight line'], correctOption: 1, classLevel: 9, difficulty: 1 },
        { text: 'Vestigial structures are...', options: ['Useful adaptations', 'Remnants of organs no longer useful', 'Bones of dinosaurs', 'Newly evolved organs'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: 'A diagram showing evolutionary relationships is a...', options: ['Punnett square', 'Food web', 'Cladogram', 'Pedigree'], correctOption: 2, classLevel: 9, difficulty: 3 },

        // === GRADE 10 === (20 Questions - Advanced Genetics, Biotechnology, Ecology)
        { text: 'What is the term for inserting a foreign gene into an organism?', options: ['Cloning', 'Genetic Engineering', 'Transcription', 'Inbreeding'], correctOption: 1, classLevel: 10, difficulty: 2 },
        { text: 'What are "sticky ends" in biotechnology?', options: ['Broken DNA', 'Overhanging single-strand DNA cuts', 'Sugar molecules', 'Protein bonds'], correctOption: 1, classLevel: 10, difficulty: 3 },
        { text: 'Which enzyme is used to "glue" DNA fragments together?', options: ['Polymerase', 'Helicase', 'Ligase', 'Nuclease'], correctOption: 2, classLevel: 10, difficulty: 3 },
        { text: 'What cuts DNA at specific sequences?', options: ['Plasmids', 'Restriction Enzymes', 'Ligases', 'Ribosomes'], correctOption: 1, classLevel: 10, difficulty: 3 },
        { text: 'A small circular ring of bacterial DNA is a...', options: ['Plasmid', 'Nucleoid', 'Chromosome', 'Centromere'], correctOption: 0, classLevel: 10, difficulty: 2 },
        { text: 'Genetically Modified Organisms are also known as...', options: ['GMOs', 'UFOs', 'Homologs', 'Mutants'], correctOption: 0, classLevel: 10, difficulty: 1 },
        { text: 'What technique separates DNA fragments by size?', options: ['PCR', 'Gel Electrophoresis', 'Cloning', 'Sequencing'], correctOption: 1, classLevel: 10, difficulty: 3 },
        { text: 'Polymerase Chain Reaction (PCR) is used to...', options: ['Cut DNA', 'Amplify (copy) DNA', 'Separate DNA', 'Mutate DNA'], correctOption: 1, classLevel: 10, difficulty: 3 },
        { text: 'What is the maximum number of individuals an environment can support called?', options: ['Limiting factor', 'Ecological peak', 'Carrying capacity', 'Population max'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'A factor that limits a population regardless of density (e.g. fire) is...', options: ['Density-dependent', 'Density-independent', 'Biotic', 'Symbiotic'], correctOption: 1, classLevel: 10, difficulty: 3 },
        { text: 'The process of ecological change over time in a community is...', options: ['Evolution', 'Succession', 'Migration', 'Transpiration'], correctOption: 1, classLevel: 10, difficulty: 2 },
        { text: 'Primary succession often begins on...', options: ['Soil', 'Burnt forests', 'Bare rock', 'Abandoned fields'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'Lichen breaking down rock is an example of a...', options: ['Climax species', 'Pioneer species', 'Keystone species', 'Invasive species'], correctOption: 1, classLevel: 10, difficulty: 2 },
        { text: 'A species critical to the survival of an ecosystem is a...', options: ['Pioneer species', 'Keystone species', 'Prey species', 'Producer'], correctOption: 1, classLevel: 10, difficulty: 2 },
        { text: 'Which biogeochemical cycle relies heavily on bacteria in the soil?', options: ['Water cycle', 'Carbon cycle', 'Nitrogen cycle', 'Phosphorus cycle'], correctOption: 2, classLevel: 10, difficulty: 3 },
        { text: 'What happens to energy as you move up an ecological pyramid?', options: ['It increases', 'It decreases', 'It stays the same', 'It disappears completely'], correctOption: 1, classLevel: 10, difficulty: 1 },
        { text: 'The "Greenhouse Effect" is heavily influenced by which gas?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correctOption: 2, classLevel: 10, difficulty: 1 },
        { text: 'Cloning an entire organism (like Dolly the sheep) uses which technique?', options: ['Somatic Cell Nuclear Transfer', 'PCR', 'Gel Electrophoresis', 'Conjugation'], correctOption: 0, classLevel: 10, difficulty: 3 },
        { text: 'What reads the mRNA and links amino acids together?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Lysosome'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'An organism that carries a recombinant DNA from another species is called...', options: ['Transgenic', 'Analogous', 'Somatic', 'Haploid'], correctOption: 0, classLevel: 10, difficulty: 2 },

        // === GRADE 11 === (20 Questions - Biochemistry, Photosynthesis, Respiration)
        { text: 'Which macromolecule is the primary short-term energy source?', options: ['Proteins', 'Lipids', 'Carbohydrates', 'Nucleic Acids'], correctOption: 2, classLevel: 11, difficulty: 1 },
        { text: 'Enzymes belong to which class of macromolecules?', options: ['Lipids', 'Carbohydrates', 'Proteins', 'Nucleic Acids'], correctOption: 2, classLevel: 11, difficulty: 2 },
        { text: 'What are the building blocks (monomers) of proteins?', options: ['Monosaccharides', 'Amino Acids', 'Nucleotides', 'Fatty Acids'], correctOption: 1, classLevel: 11, difficulty: 2 },
        { text: 'What property of water allows it to stick to other surfaces?', options: ['Cohesion', 'Adhesion', 'Specific heat', 'Density'], correctOption: 1, classLevel: 11, difficulty: 2 },
        { text: 'Which organelle is the site of cellular respiration?', options: ['Chloroplast', 'Nucleus', 'Mitochondria', 'Ribosome'], correctOption: 2, classLevel: 11, difficulty: 1 },
        { text: 'What is the universal energy currency of the cell?', options: ['DNA', 'ATP', 'Glucose', 'RNA'], correctOption: 1, classLevel: 11, difficulty: 1 },
        { text: 'Where do the light-dependent reactions of photosynthesis occur?', options: ['Stroma', 'Thylakoids', 'Cytoplasm', 'Matrix'], correctOption: 1, classLevel: 11, difficulty: 3 },
        { text: 'What is the final electron acceptor in the electron transport chain (respiration)?', options: ['Water', 'Carbon Dioxide', 'Oxygen', 'NAD+'], correctOption: 2, classLevel: 11, difficulty: 3 },
        { text: 'Glycolysis breaks down glucose into two molecules of...', options: ['Lactic Acid', 'Pyruvate', 'Citric Acid', 'Ethanol'], correctOption: 1, classLevel: 11, difficulty: 3 },
        { text: 'Where does the Calvin Cycle take place?', options: ['Thylakoid', 'Stroma', 'Matrix', 'Cytoplasm'], correctOption: 1, classLevel: 11, difficulty: 3 },
        { text: 'Which process occurs when oxygen is NOT present?', options: ['Krebs Cycle', 'Electron Transport Chain', 'Fermentation', 'Calvin Cycle'], correctOption: 2, classLevel: 11, difficulty: 2 },
        { text: 'What type of fermentation occurs in human muscle cells?', options: ['Alcoholic', 'Lactic Acid', 'Acetic', 'Butyric'], correctOption: 1, classLevel: 11, difficulty: 2 },
        { text: 'Fatty acids with no double bonds between carbon atoms are...', options: ['Saturated', 'Unsaturated', 'Trans-fats', 'Steroids'], correctOption: 0, classLevel: 11, difficulty: 3 },
        { text: 'Which structure regulates what enters and exits the cell?', options: ['Cell wall', 'Nuclear envelope', 'Plasma membrane', 'Cytoskeleton'], correctOption: 2, classLevel: 11, difficulty: 1 },
        { text: 'The plasma membrane is primarily composed of a...', options: ['Protein coat', 'Phospholipid bilayer', 'Cellulose wall', 'Carbohydrate matrix'], correctOption: 1, classLevel: 11, difficulty: 2 },
        { text: 'Water moving across a semipermeable membrane is called...', options: ['Active Transport', 'Diffusion', 'Osmosis', 'Endocytosis'], correctOption: 2, classLevel: 11, difficulty: 1 },
        { text: 'A cell placed in a hypertonic solution will...', options: ['Swell', 'Burst', 'Shrink', 'Stay the same'], correctOption: 2, classLevel: 11, difficulty: 3 },
        { text: 'Which phase of the cell cycle is DNA replicated?', options: ['G1 Phase', 'S Phase', 'G2 Phase', 'M Phase'], correctOption: 1, classLevel: 11, difficulty: 2 },
        { text: 'C4 and CAM plants have adaptations for...', options: ['Cold climates', 'Wet, swampy areas', 'Hot, dry climates', 'Deep ocean environments'], correctOption: 2, classLevel: 11, difficulty: 3 },
        { text: 'How many ATP are roughly produced per glucose in aerobic respiration?', options: ['2', '4', '16', '36-38'], correctOption: 3, classLevel: 11, difficulty: 3 },

        // === GRADE 12 === (20 Questions - Advanced Physiology, Molecular Bio, Immunology)
        { text: 'What type of immune cell produces antibodies?', options: ['T-cells', 'B-cells', 'Macrophages', 'Neutrophils'], correctOption: 1, classLevel: 12, difficulty: 3 },
        { text: 'Which part of the brain controls breathing and heart rate?', options: ['Cerebrum', 'Cerebellum', 'Medulla Oblongata', 'Hypothalamus'], correctOption: 2, classLevel: 12, difficulty: 3 },
        { text: 'What chemical messengers are produced by the endocrine system?', options: ['Neurotransmitters', 'Enzymes', 'Hormones', 'Antibodies'], correctOption: 2, classLevel: 12, difficulty: 1 },
        { text: 'Which hormone triggers ovulation in females?', options: ['FSH', 'LH', 'Estrogen', 'Progesterone'], correctOption: 1, classLevel: 12, difficulty: 3 },
        { text: 'The gap between two neurons is called a...', options: ['Dendrite', 'Synapse', 'Axon', 'Node of Ranvier'], correctOption: 1, classLevel: 12, difficulty: 2 },
        { text: 'The myelin sheath on a neuron serves to...', options: ['Produce neurotransmitters', 'Slow down impulses', 'Insulate and speed up impulses', 'Destroy foreign bodies'], correctOption: 2, classLevel: 12, difficulty: 2 },
        { text: 'What organ filters blood and helps regulate blood pressure?', options: ['Liver', 'Spleen', 'Kidney', 'Pancreas'], correctOption: 2, classLevel: 12, difficulty: 2 },
        { text: 'The functional unit of the kidney is the...', options: ['Nephron', 'Alveolus', 'Villus', 'Ganglion'], correctOption: 0, classLevel: 12, difficulty: 3 },
        { text: 'Vaccines work by stimulating the production of...', options: ['Antibiotics', 'Memory cells', 'Red blood cells', 'Allergens'], correctOption: 1, classLevel: 12, difficulty: 2 },
        { text: 'An autoimmune disease occurs when...', options: ['Viruses reproduce rapidly', 'The body attacks its own cells', 'Antibiotics stop working', 'Pathogens enter cuts'], correctOption: 1, classLevel: 12, difficulty: 2 },
        { text: 'During muscle contraction, calcium binds to...', options: ['Actin', 'Myosin', 'Troponin', 'Tropomyosin'], correctOption: 2, classLevel: 12, difficulty: 3 },
        { text: 'The sliding filament model explains how...', options: ['Nerves fire', 'Bones break', 'Muscles contract', 'Blood flows'], correctOption: 2, classLevel: 12, difficulty: 2 },
        { text: 'In DNA replication, which enzyme unzips the DNA double helix?', options: ['DNA Polymerase', 'Helicase', 'Primase', 'Ligase'], correctOption: 1, classLevel: 12, difficulty: 2 },
        { text: 'Okazaki fragments are formed on the...', options: ['Leading strand', 'Lagging strand', 'mRNA template', 'Ribosome'], correctOption: 1, classLevel: 12, difficulty: 3 },
        { text: 'A group of 3 nucleotides on mRNA is called a...', options: ['Gene', 'Codon', 'Anticodon', 'Intron'], correctOption: 1, classLevel: 12, difficulty: 2 },
        { text: 'Non-coding regions of mRNA that are spliced out are called...', options: ['Exons', 'Promoters', 'Introns', 'Operons'], correctOption: 2, classLevel: 12, difficulty: 3 },
        { text: 'The lac operon in E. coli controls the breakdown of...', options: ['Glucose', 'Lactose', 'Sucrose', 'Starch'], correctOption: 1, classLevel: 12, difficulty: 3 },
        { text: 'What is the start codon for translation?', options: ['UAA', 'UAG', 'UGA', 'AUG'], correctOption: 3, classLevel: 12, difficulty: 3 },
        { text: 'The "master gland" of the endocrine system is the...', options: ['Thyroid', 'Adrenal gland', 'Pituitary gland', 'Pancreas'], correctOption: 2, classLevel: 12, difficulty: 2 },
        { text: 'Which process restores the diploid chromosomal number in humans?', options: ['Meiosis', 'Fertilization', 'Mitosis', 'Cleavage'], correctOption: 1, classLevel: 12, difficulty: 2 },
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
