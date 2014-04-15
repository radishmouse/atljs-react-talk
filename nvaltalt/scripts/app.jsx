/**
 * @jsx React.DOM
 */

var Editor = React.createClass({
    render: function () {
        return (
            <textarea value={ this.props.document.content }></textarea>
        );
    }
});

var DocumentRow = React.createClass({
    render: function () {
        var styleObject = this.props.key % 2 == 0 ? {} : { backgroundColor: "#ccc" };
        return (
            <tr style={ styleObject }>
                <td>
                    { this.props.title }
                </td>
            </tr>
        );
    }
});

var DocumentList = React.createClass({
    selectDocument: function (document) {
        setTimeout(function () {
            this.props.setCurrentDocument(document);
        }.bind(this), 0)
    },
    render: function () {
        var documents = this.props.documents;

        if (this.props.filterText.length > 0) {
            documents = this.props.documents.filter(function (doc) {
                if (this.props.filterText.length > 0) {
                    var passesFilter = (doc.title.toLowerCase().indexOf(this.props.filterText.toLowerCase()) != -1) ||
                                       (doc.content.toLowerCase().indexOf(this.props.filterText.toLowerCase()) != -1);
                    return passesFilter;
                }
            }.bind(this));

            if (documents.length > 0) {
                // Select the first one
                this.selectDocument(documents[0]);
            }
        }

        var rows = documents.map(function (document, i) {
            return <DocumentRow key={i} title={ document.title} />;
        });

        return (
            <table>
                <tbody>
                    { rows }
                </tbody>
            </table>
        );
    }
});

var SearchClear = React.createClass({
    handleClick: function () {
        this.props.setSearchText('');
    },
    render: function () {
        return (
            <button
                onClick={ this.handleClick }
            >
                X
            </button>
        );
    }
});

var SearchInput = React.createClass({
    handleChange: function (evt) {
        this.props.setSearchText(evt.target.value);
    },
    render: function () {
        return (
                <input
                    value={ this.props.filterText }
                    onChange={ this.handleChange }
                >
                </input>
        );
    }
});

var SearchBar = React.createClass({
    render: function () {
        return (
            <div>
                <SearchInput
                    filterText={ this.props.filterText }
                    setSearchText={ this.props.setSearchText }
                />
                <SearchClear
                    filterText={ this.props.filterText }
                    setSearchText={ this.props.setSearchText }
                />
            </div>
        );
    }
});

var nvAltApp = React.createClass({
    getInitialState: function () {
        return {
            filterText: '',
            docs: this.props.docs,
            currentDocument: EMPTY_DOC
        }
    },
    didChangeSearchText: function (value) {
        this.setState({
            filterText: value
        });
    },

    didChangeCurrentDocument: function (doc) {
        this.setState({
            currentDocument: doc
        });
    },
    render: function () {
        return (
            <div>
                <SearchBar
                    filterText={ this.state.filterText }
                    setSearchText={ this.didChangeSearchText }
                />
                <DocumentList
                    filterText={ this.state.filterText }
                    documents={ this.state.docs }
                    setCurrentDocument={ this.didChangeCurrentDocument }
                />
                <Editor document={ this.state.filterText ? this.state.currentDocument : EMPTY_DOC } />
            </div>
        );
    }
});

var EMPTY_DOC = {
    title: '',
    content: ''
};

var DUMMY_DOCS = [
    {
        title: 'A Game of Thrones',
        content: "The morning had dawned clear and cold, with a crispness that hinted at the end of summer. They set forth at daybreak to see a man beheaded, twenty in all, and Bran rode among them, nervous with excitement. This was the first time he had been deemed old enough to go with his lord father and his brothers to see the king's justice done. It was the ninth year of summer, and the seventh of Bran's life."
    },
    {
        title: 'A Clash of Kings',
        content: 'At Winterfell they had called her "Arya Horseface" and she\'d thought  nothing could be worse, but that was before the orphan boy Lommy Greenhands had  named her "Lumpyhead." Her head felt lumpy when she touched it. When Yoren had dragged her  into that alley she\'d thought he meant to kill her, but the sour old man had'
    },
    {
        title: 'A Storm of Swords',
        content: 'The day was grey and bitter cold, and the dogs would not take the scent. The big black bitch had taken one sniff at the bear tracks, backed off, and skulked back to the pack with her tail between her legs. The dogs huddled together miserably on the riverbank as the wind snapped at them. Chett felt it too, biting through his layers of black wool and boiled leather. It was too bloody cold for man or beast, but here they were. His mouth twisted, and he could almost feel the boils that covered his cheeks and neck growing red and angry. I should be safe back at the Wall, tending the bloody ravens and making fires for old Maester Aemon. It was the bastard Jon Snow who had taken that from him, him and his fat friend Sam Tarly. It was their fault he was here, freezing his bloody balls off with a pack of hounds deep in the haunted forest. '
    },
    {
        title: 'A Feast for Crows',
        content: 'She dreamt she sat the Iron Throne, high above them all. The courtiers were brightly colored mice below. Great lords and proud ladies knelt before her. Bold young knights laid their swords at her feet and pleaded for her favors, and the queen smiled down at them. Until the dwarf appeared as if from nowhere, pointing at her and howling with laughter. The lords and ladies began to chuckle too, hiding their smiles behind their hands. Only then did the queen realize she was naked.'
    },
    {
        title: 'A Dance with Dragons',
        content: 'He drank his way across the narrow sea. The ship was small and his cabin smaller, and the captain would not allow him abovedecks. The rocking of the deck beneath his feet made his stomach heave, and the wretched food they served him tasted even worse when retched back up. Besides, why did he need salt beef, hard cheese, and bread crawling with worms when he had wine to nourish him? It was red and sour, very strong. He sometimes heaved the wine up too, but there was always more. "The world is full of wine," he muttered in the dankness of his cabin. His father had never had any use for drunkards, but what did that matter? His father was dead. He ought to know; he\'d killed him. A bolt in the belly, my lord, and all for you. If only I was better with a crossbow, I would have put it through that cock you made me with, you bloody bastard.'
    }
];

React.renderComponent(
    <nvAltApp docs={DUMMY_DOCS} />,
    document.body
);