const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, REST, Routes } = require('discord.js');
require('dotenv').config();

// Configuración del cliente
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Base de datos de productos (3 idiomas)
const PRODUCTS = {
    premium: {
        es: {
            name: "🌟 Producto Premium",
            description: "Acceso completo a todas las funciones premium",
            features: "**Características:**\n• Acceso ilimitado 24/7\n• Soporte prioritario\n• Actualizaciones automáticas\n• Sin anuncios\n• Calidad HD",
            prices: "**💰 PRECIOS:**\n💵 6 USD : 7 días\n💵 10 USD : 15 días\n💵 16 USD : 30 días",
            payment_methods: "**💳 Métodos de Pago:**\n• Western Union\n• Binance Crypto\n• Airtm\n\n**🇵🇪 Solo para Perú:**\n10% de descuento:\n• YAPE\n• BCP",
            demo: "🎥 **Video de demostración:**\nhttps://youtube.com/watch?v=demo-premium"
        },
        en: {
            name: "🌟 Premium Product",
            description: "Full access to all premium features",
            features: "**Features:**\n• Unlimited 24/7 access\n• Priority support\n• Automatic updates\n• Ad-free\n• HD quality",
            prices: "**💰 PRICING:**\n💵 6 USD : 7 days\n💵 10 USD : 15 days\n💵 16 USD : 30 days",
            payment_methods: "**💳 Payment Methods:**\n• Western Union\n• Binance Crypto\n• Airtm\n\n**🇵🇪 Peru Only:**\n10% discount:\n• YAPE\n• BCP",
            demo: "🎥 **Demo Video:**\nhttps://youtube.com/watch?v=demo-premium"
        },
        pt: {
            name: "🌟 Produto Premium",
            description: "Acesso completo a todos os recursos premium",
            features: "**Características:**\n• Acesso ilimitado 24/7\n• Suporte prioritário\n• Atualizações automáticas\n• Sem anúncios\n• Qualidade HD",
            prices: "**💰 PREÇOS:**\n💵 6 USD : 7 dias\n💵 10 USD : 15 dias\n💵 16 USD : 30 dias",
            payment_methods: "**💳 Métodos de Pagamento:**\n• Western Union\n• Binance Crypto\n• Airtm\n\n**🇵🇪 Somente Peru:**\n10% de desconto:\n• YAPE\n• BCP",
            demo: "🎥 **Vídeo de demonstração:**\nhttps://youtube.com/watch?v=demo-premium"
        }
    },
    standard: {
        es: {
            name: "⚡ Producto Standard",
            description: "Plan balanceado con las funciones esenciales",
            features: "**Características:**\n• Acceso completo\n• Soporte estándar\n• Calidad SD/HD\n• Pocas limitaciones",
            prices: "**💰 PRECIOS:**\n💵 6 USD : 7 días\n💵 10 USD : 15 días\n💵 16 USD : 30 días",
            payment_methods: "**💳 Métodos de Pago:**\n• Western Union\n• Binance Crypto\n• Airtm\n\n**🇵🇪 Solo para Perú:**\n10% de descuento:\n• YAPE\n• BCP",
            demo: "🎥 **Video de demostración:**\nhttps://youtube.com/watch?v=demo-standard"
        },
        en: {
            name: "⚡ Standard Product",
            description: "Balanced plan with essential features",
            features: "**Features:**\n• Full access\n• Standard support\n• SD/HD quality\n• Few limitations",
            prices: "**💰 PRICING:**\n💵 6 USD : 7 days\n💵 10 USD : 15 days\n💵 16 USD : 30 days",
            payment_methods: "**💳 Payment Methods:**\n• Western Union\n• Binance Crypto\n• Airtm\n\n**🇵🇪 Peru Only:**\n10% discount:\n• YAPE\n• BCP",
            demo: "🎥 **Demo Video:**\nhttps://youtube.com/watch?v=demo-standard"
        },
        pt: {
            name: "⚡ Produto Standard",
            description: "Plano equilibrado com recursos essenciais",
            features: "**Características:**\n• Acesso completo\n• Suporte padrão\n• Qualidade SD/HD\n• Poucas limitações",
            prices: "**💰 PREÇOS:**\n💵 6 USD : 7 dias\n💵 10 USD : 15 dias\n💵 16 USD : 30 dias",
            payment_methods: "**💳 Métodos de Pagamento:**\n• Western Union\n• Binance Crypto\n• Airtm\n\n**🇵🇪 Somente Peru:**\n10% de desconto:\n• YAPE\n• BCP",
            demo: "🎥 **Vídeo de demonstração:**\nhttps://youtube.com/watch?v=demo-standard"
        }
    },
    basic: {
        es: {
            name: "💼 Producto Básico",
            description: "Plan inicial para comenzar",
            features: "**Características:**\n• Acceso básico\n• Soporte por email\n• Calidad SD\n• Limitaciones moderadas",
            prices: "**💰 PRECIOS:**\n💵 6 USD : 7 días\n💵 10 USD : 15 días\n💵 16 USD : 30 días",
            payment_methods: "**💳 Métodos de Pago:**\n• Western Union\n• Binance Crypto\n• Airtm\n\n**🇵🇪 Solo para Perú:**\n10% de descuento:\n• YAPE\n• BCP",
            demo: "🎥 **Video de demostración:**\nhttps://youtube.com/watch?v=demo-basic"
        },
        en: {
            name: "💼 Basic Product",
            description: "Starter plan to get started",
            features: "**Features:**\n• Basic access\n• Email support\n• SD quality\n• Moderate limitations",
            prices: "**💰 PRICING:**\n💵 6 USD : 7 days\n💵 10 USD : 15 days\n💵 16 USD : 30 days",
            payment_methods: "**💳 Payment Methods:**\n• Western Union\n• Binance Crypto\n• Airtm\n\n**🇵🇪 Peru Only:**\n10% discount:\n• YAPE\n• BCP",
            demo: "🎥 **Demo Video:**\nhttps://youtube.com/watch?v=demo-basic"
        },
        pt: {
            name: "💼 Produto Básico",
            description: "Plano inicial para começar",
            features: "**Características:**\n• Acesso básico\n• Suporte por email\n• Qualidade SD\n• Limitações moderadas",
            prices: "**💰 PREÇOS:**\n💵 6 USD : 7 dias\n💵 10 USD : 15 dias\n💵 16 USD : 30 dias",
            payment_methods: "**💳 Métodos de Pagamento:**\n• Western Union\n• Binance Crypto\n• Airtm\n\n**🇵🇪 Somente Peru:**\n10% de desconto:\n• YAPE\n• BCP",
            demo: "🎥 **Vídeo de demonstração:**\nhttps://youtube.com/watch?v=demo-basic"
        }
    }
};

// Textos del menú
const MENU_TEXT = {
    es: "**🛍️ Catálogo de Productos**\n\nSelecciona un producto para ver toda la información:",
    en: "**🛍️ Product Catalog**\n\nSelect a product to see all information:",
    pt: "**🛍️ Catálogo de Produtos**\n\nSelecione um produto para ver todas as informações:"
};

// Comandos slash
const commands = [
    // Español
    new SlashCommandBuilder()
        .setName('productos')
        .setDescription('Ver catálogo de productos en español'),
    new SlashCommandBuilder()
        .setName('producto')
        .setDescription('Ver información de un producto específico')
        .addStringOption(option =>
            option.setName('nombre')
                .setDescription('Nombre del producto')
                .setRequired(true)
                .addChoices(
                    { name: '🌟 Premium', value: 'premium' },
                    { name: '⚡ Standard', value: 'standard' },
                    { name: '💼 Básico', value: 'basic' }
                )),
    
    // English
    new SlashCommandBuilder()
        .setName('products')
        .setDescription('View product catalog in English'),
    new SlashCommandBuilder()
        .setName('product')
        .setDescription('View specific product information')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Product name')
                .setRequired(true)
                .addChoices(
                    { name: '🌟 Premium', value: 'premium' },
                    { name: '⚡ Standard', value: 'standard' },
                    { name: '💼 Basic', value: 'basic' }
                )),
    
    // Português
    new SlashCommandBuilder()
        .setName('produtos')
        .setDescription('Ver catálogo de produtos em português'),
    new SlashCommandBuilder()
        .setName('produto')
        .setDescription('Ver informações de um produto específico')
        .addStringOption(option =>
            option.setName('nome')
                .setDescription('Nome do produto')
                .setRequired(true)
                .addChoices(
                    { name: '🌟 Premium', value: 'premium' },
                    { name: '⚡ Standard', value: 'standard' },
                    { name: '💼 Básico', value: 'basic' }
                )),
    
    // Help
    new SlashCommandBuilder()
        .setName('help')
        .setDescription('Muestra todos los comandos / Shows all commands / Mostra todos os comandos')
];

// Función para crear embed de producto
function createProductEmbed(product) {
    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(product.name)
        .setDescription(product.description)
        .addFields(
            { name: '\u200b', value: product.features, inline: false },
            { name: '\u200b', value: product.prices, inline: false },
            { name: '\u200b', value: product.payment_methods, inline: false },
            { name: '\u200b', value: product.demo, inline: false }
        )
        .setTimestamp()
        .setFooter({ text: 'Sistema de Productos' });
    
    return embed;
}

// Función para crear botones
function createProductButtons(lang) {
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`premium_${lang}`)
                .setLabel('🌟 Premium')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`standard_${lang}`)
                .setLabel('⚡ Standard')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId(`basic_${lang}`)
                .setLabel('💼 ' + (lang === 'en' ? 'Basic' : 'Básico'))
                .setStyle(ButtonStyle.Secondary)
        );
    
    return row;
}

// Evento: Bot listo
client.once('ready', async () => {
    console.log(`✅ Bot conectado como ${client.user.tag}`);
    
    // Registrar comandos slash
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    
    try {
        console.log('🔄 Registrando comandos slash...');
        
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands.map(cmd => cmd.toJSON()) }
        );
        
        console.log('✅ Comandos slash registrados correctamente!');
    } catch (error) {
        console.error('❌ Error al registrar comandos:', error);
    }
});

// Manejador de interacciones
client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand()) {
        const { commandName } = interaction;
        
        // Comandos de catálogo
        if (commandName === 'productos' || commandName === 'products' || commandName === 'produtos') {
            const lang = commandName === 'productos' ? 'es' : commandName === 'products' ? 'en' : 'pt';
            
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle(MENU_TEXT[lang])
                .setTimestamp();
            
            await interaction.reply({
                embeds: [embed],
                components: [createProductButtons(lang)]
            });
        }
        
        // Comandos de producto específico
        else if (commandName === 'producto' || commandName === 'product' || commandName === 'produto') {
            const lang = commandName === 'producto' ? 'es' : commandName === 'product' ? 'en' : 'pt';
            const productKey = interaction.options.getString(lang === 'es' ? 'nombre' : lang === 'en' ? 'name' : 'nome');
            
            if (PRODUCTS[productKey] && PRODUCTS[productKey][lang]) {
                const product = PRODUCTS[productKey][lang];
                const embed = createProductEmbed(product);
                
                await interaction.reply({ embeds: [embed] });
            } else {
                await interaction.reply({
                    content: '❌ Producto no encontrado / Product not found / Produto não encontrado',
                    ephemeral: true
                });
            }
        }
        
        // Comando help
        else if (commandName === 'help') {
            const helpEmbed = new EmbedBuilder()
                .setColor('#ffaa00')
                .setTitle('📚 Comandos Disponibles / Available Commands / Comandos Disponíveis')
                .addFields(
                    {
                        name: '🇪🇸 Español',
                        value: '`/productos` - Ver catálogo\n`/producto [nombre]` - Ver producto',
                        inline: false
                    },
                    {
                        name: '🇬🇧 English',
                        value: '`/products` - View catalog\n`/product [name]` - View product',
                        inline: false
                    },
                    {
                        name: '🇧🇷 Português',
                        value: '`/produtos` - Ver catálogo\n`/produto [nome]` - Ver produto',
                        inline: false
                    }
                )
                .setTimestamp();
            
            await interaction.reply({ embeds: [helpEmbed] });
        }
    }
    
    // Manejador de botones
    else if (interaction.isButton()) {
        const [productKey, lang] = interaction.customId.split('_');
        
        if (PRODUCTS[productKey] && PRODUCTS[productKey][lang]) {
            const product = PRODUCTS[productKey][lang];
            const embed = createProductEmbed(product);
            
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
});

// Iniciar bot
client.login(process.env.DISCORD_TOKEN);
