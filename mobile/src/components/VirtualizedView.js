import React from 'react';
import { FlatList } from 'react-native';

export default function VirtualizedView({ children }) {
    return (
        <FlatList
            data={[]}
            ListEmptyComponent={null}
            keyExtractor={() => "dummy"}
            renderItem={null}
            ListHeaderComponent={() => (
                <React.Fragment>{children}</React.Fragment>
            )}
        />
    );
}